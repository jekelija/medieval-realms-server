
use crate::schema;
use crate::session::{Session};
use crate::models::{Error};

use diesel::insert_into;
use diesel::prelude::*;
use serde::Deserialize;
use warp::http::{header, Response, StatusCode};
use warp::{
    reject::{custom}, Rejection, Reply,
};

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
    realname: String,
    password: String,
}

impl SignupForm {
    fn validate(self) -> Result<Self, &'static str> {
        if self.user.len() < 2 {
            Err("Username must be at least two characters")
        } else if self.realname.is_empty() {
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
            .status(StatusCode::FOUND)
            .header(header::LOCATION, "/")
            .header(
                header::SET_COOKIE,
                format!("EXAUTH={}; SameSite=Strict; HttpOpnly", cookie),
            )
            .body(b"".to_vec())
            .map_err(custom)
    } else {
        Err(warp::reject::custom(Error::UserNotFound))
    }
}

pub fn do_logout(mut session: Session) -> Result<impl Reply, Rejection> {
    session.clear();
    Response::builder()
        .status(StatusCode::FOUND)
        .header(header::LOCATION, "/")
        .header(
            header::SET_COOKIE,
            "EXAUTH=; Max-Age=0; SameSite=Strict; HttpOpnly",
        )
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
            let hash = bcrypt::hash(&form.password, bcrypt::DEFAULT_COST)
                .map_err(|e| format!("Hash failed: {}", e))?;
            Ok((form, hash))
        })
        .and_then(|(form, hash)| {
            use schema::users::dsl::*;
            insert_into(users)
                .values((
                    username.eq(form.user),
                    realname.eq(form.realname),
                    password.eq(&hash),
                ))
                .execute(session.db())
                .map_err(|e| format!("Oops: {}", e))
        });
    match result {
        Ok(_) => {
            Response::builder()
                .status(StatusCode::FOUND)
                .header(header::LOCATION, "/")
                // TODO: Set a session cookie?
                .body(b"".to_vec())
                .map_err(custom)
        }
        Err(msg) => {
            Err(warp::reject::custom(msg))
        }
    }
}