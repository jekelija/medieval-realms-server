
extern crate ring;
extern crate data_encoding;

use crate::schema;
use crate::session::{Session};

use ring::{digest, pbkdf2};
use data_encoding::HEXUPPER;

use diesel::insert_into;
use diesel::prelude::*;
use serde::Deserialize;
use warp::http::{Response, StatusCode};
use warp::{
    reject::{custom}, Rejection, Reply,
};

static PBKDF2_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA512;
const CREDENTIAL_LEN: usize = digest::SHA512_OUTPUT_LEN;

const DB_SALT_COMPONENT: [u8; 16] = [
            // This value was generated from a secure PRNG.
            0xd6, 0x26, 0x98, 0xda, 0xf4, 0xdc, 0x50, 0x52,
            0x24, 0xf2, 0x27, 0xd1, 0xfe, 0x39, 0x01, 0x8a
        ];

/// The data submitted by the login form.
/// This does not derive Debug or Serialize, as the password is plain text.
#[derive(Deserialize)]
pub struct LoginForm {
    user: String,
    password: String,
}

/// The data submitted by the login form.
/// This does not derive Debug or Serialize, as the password is plain text.
#[derive(Deserialize)]
pub struct SignupForm {
    user: String,
    name: String,
    password: String,
}

impl SignupForm {
    fn validate(self) -> Result<Self, &'static str> {
        if self.user.len() < 2 {
            Err("Username must be at least two characters")
        } else if self.name.is_empty() {
            Err("A real name (or pseudonym) must be given")
        } else if self.password.len() < 3 {
            Err("Please use a better password")
        } else {
            Ok(self)
        }
    }
}

/// Verify a login attempt.
///
/// If the credentials in the LoginForm are correct, redirect to the
/// home page.
/// Otherwise, show the login form again, but with a message.
pub fn do_login(
    mut session: Session,
    form: LoginForm,
) -> Result<impl Reply, Rejection> {
    if let Some(cookie) = session.authenticate(&form.user, &form.password) {
        Response::builder()
            .status(StatusCode::OK)
            .header(
               "EXAUTH",
               format!("{}", cookie),
            )
            //.header(
            //    header::SET_COOKIE,
            //    format!("EXAUTH={}", cookie),
            //)
            .body(b"".to_vec())
            .map_err(custom)
    } else {
        Err(warp::reject::not_found())
    }
}

pub fn do_logout(mut session: Session) -> Result<impl Reply, Rejection> {
    session.clear();
    Response::builder()
        .status(StatusCode::OK)
        //.header(
        //    header::SET_COOKIE,
        //    "EXAUTH=; Max-Age=0; SameSite=Strict; HttpOnly",
        //)
        .body(b"".to_vec())
        .map_err(custom)
}



/// Handle a submitted signup form.
pub fn do_signup(
    session: Session,
    form: SignupForm,
) -> Result<impl Reply, Rejection> {
    let result = form
        .validate()
        .map_err(|e| e.to_string())
        .and_then(|form| {
            let n_iter: std::num::NonZeroU32 = std::num::NonZeroU32::new(100_000).unwrap();

            //generate salt
            let mut salt = Vec::with_capacity(DB_SALT_COMPONENT.len() +
                                        form.user.as_bytes().len());
            salt.extend(DB_SALT_COMPONENT.as_ref());
            salt.extend(form.user.as_bytes());

            let mut pbkdf2_hash = [0u8; CREDENTIAL_LEN];
            pbkdf2::derive(
                PBKDF2_ALG,
                n_iter,
                &salt,
                form.password.as_bytes(),
                &mut pbkdf2_hash,
            );
            
            Ok((form, pbkdf2_hash, salt))
        })
        .and_then(|(form, hash, salt_value)| {
            use schema::users::dsl::*;
            insert_into(users)
                .values((
                    username.eq(form.user),
                    name.eq(form.name),
                    password.eq(HEXUPPER.encode(&hash)),
                    salt.eq(HEXUPPER.encode(&salt_value)),
                ))
                .execute(session.db())
                .map_err(|e| {
                    format!("Error: {}", e)
                })
        });
    match result {
        Ok(_) => {
            Response::builder()
                .status(StatusCode::OK)
                // TODO: Set a session cookie?
                .body(b"".to_vec())
                .map_err(custom)
        }
        Err(msg) => {
            Err(warp::reject::custom(msg))
        }
    }
}
