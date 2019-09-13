use bcrypt;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use log::error;
use std::error::Error as StdError;
use std::fmt::{self, Display};

use serde::Serialize;

#[derive(Copy, Clone, Debug)]
pub enum Error {
    // NoGameFound,
    UserNotFound
}

#[derive(Serialize)]
pub struct ErrorMessage {
    pub code: u16,
    pub message: String,
}

impl Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.write_str(match self {
            // Error::NoGameFound => "No Game Found",
            Error::UserNotFound => "UserNotFound"
        })
    }
}

impl StdError for Error {}

#[derive(Debug, Queryable)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub realname: String,
}

impl User {
    pub fn authenticate(
        db: &PgConnection,
        user: &str,
        pass: &str,
    ) -> Option<Self> {
        use crate::schema::users::dsl::*;
        let (user, hash) = match users
            .filter(username.eq(user))
            .select(((id, username, realname), password))
            .first::<(User, String)>(db)
        {
            Ok((user, hash)) => (user, hash),
            Err(e) => {
                error!("Failed to load hash for {:?}: {:?}", user, e);
                return None;
            }
        };

        match bcrypt::verify(&pass, &hash) {
            Ok(true) => Some(user),
            Ok(false) => None,
            Err(e) => {
                error!("Verify failed for {:?}: {:?}", user, e);
                None
            }
        }
    }
}