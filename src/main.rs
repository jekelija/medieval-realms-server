//! An example web service using ructe with the warp framework.
#![deny(warnings)]
#[macro_use]
extern crate diesel;

mod models;
mod schema;
mod session;
mod auth;


use dotenv::dotenv;
use session::{create_session_filter};
use auth::{do_login, do_logout, do_signup};
use models::{Error, ErrorMessage};


use warp::{
    Filter, Rejection, Reply,
};
use warp::http::{StatusCode};
use warp::{body, path};



/// Main program: Set up routes and start server.
fn main() {
    dotenv().ok();
    env_logger::init();

    // Get a filter that adds a session to each request.
    let pgsess = create_session_filter("host=localhost port=5432 dbname=medieval-realms connect_timeout=10 user=postgres password=Hufflepuff4life");
    let s = move || pgsess.clone();

    let routes = warp::post2().and(
            (s().and(path("login")).and(body::form()).and_then(do_login))
                .or(s().and(path("logout")).and_then(do_logout))
                .or(s()
                    .and(path("signup"))
                    .and(body::form())
                    .and_then(do_signup)),
        )
        .recover(customize_error);
    warp::serve(routes).run(([127, 0, 0, 1], 3030));
}

/// Create custom error pages.
// This function receives a `Rejection` and tries to return a custom
// value, othewise simply passes the rejection along.
fn customize_error(err: Rejection) -> Result<impl Reply, Rejection> {
    if let Some(&err) = err.find_cause::<Error>() {
        let code = match err {
            // Error::NoGameFound => StatusCode::BAD_REQUEST,
            Error::UserNotFound => StatusCode::BAD_REQUEST
        };
        let msg = err.to_string();

        let json = warp::reply::json(&ErrorMessage {
            code: code.as_u16(),
            message: msg,
        });
        Ok(warp::reply::with_status(json, code))
    } else if let Some(_) = err.find_cause::<warp::reject::MethodNotAllowed>() {
        // We can handle a specific error, here METHOD_NOT_ALLOWED,
        // and render it however we want
        let code = StatusCode::METHOD_NOT_ALLOWED;
        let json = warp::reply::json(&ErrorMessage {
            code: code.as_u16(),
            message: "oops, you aren't allowed to use this method.".into(),
        });
        Ok(warp::reply::with_status(json, code))
    } else {
        // Could be a NOT_FOUND, or any other internal error... here we just
        // let warp use its default rendering.
        Err(err)
    }
}