use diesel::pg::PgConnection;
use diesel::prelude::*;
use log::error;
use data_encoding::HEXUPPER;

use ring::{pbkdf2};

static PBKDF2_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA512;

#[derive(Clone)]
pub enum GameState {
    CREATED,
    JOINED,
    // OVER
}

#[derive(Clone, Queryable)]
pub struct Game {
    pub id: i32,
    pub shared_data: serde_json::Value
}

#[derive(Debug, Clone, Queryable)]
pub struct User {
    pub id: i32,
    pub username: String
}

impl User {
    pub fn authenticate(
        db: &PgConnection,
        username_str: &str,
        pass: &str,
    ) -> Option<Self> {
        use crate::schema::users::dsl::*;
        let (user, hash, salt_value) = match users
            .filter(username.eq(username_str))
            .select(((id, username), password, salt))
            .first::<(User, String, String)>(db)
        {
            Ok((user, hash, salt_value)) => (user, hash, salt_value),
            Err(e) => {
                error!("Failed to load hash for {:?}: {:?}", username_str, e);
                return None;
            }
        };

        let n_iter: std::num::NonZeroU32 = std::num::NonZeroU32::new(100_000).unwrap();


        match pbkdf2::verify(PBKDF2_ALG, n_iter, &HEXUPPER.decode(&salt_value.into_bytes()).unwrap(),
                            pass.as_bytes(),
                            &HEXUPPER.decode(&hash.into_bytes()).unwrap()) {
            Ok(_) => Some(user),
            Err(e) => {
                error!("Verify failed for {:?}: {:?}", user, e);
                None
            }
        }
    }
}