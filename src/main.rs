//! An example web service using ructe with the warp framework.
#![deny(warnings)]
#[macro_use]
extern crate diesel;

extern crate log;
extern crate chrono;
extern crate env_logger;

use std::io::Write;
use chrono::Local;
use env_logger::Builder;
use log::LevelFilter;

mod models;
mod schema;
mod session;
mod auth;
mod game;


use session::{create_session_filter};
use auth::{do_login, do_logout, do_signup};
// use game::{do_create_game, do_join_game, do_get_games};
use game::{do_create_game, do_join_game};

use warp::{
    Filter
};
use warp::{body, path};



/// Main program: Set up routes and start server.
fn main() {
    Builder::new()
        .format(|buf, record| {
            writeln!(buf,
                "{} [{}] - {}",
                Local::now().format("%Y-%m-%dT%H:%M:%S"),
                record.level(),
                record.args()
            )
        })
        .filter(None, LevelFilter::Info)
        .init();


    // Get a filter that adds a session to each request.
    let pgsess = create_session_filter("host=localhost port=5432 dbname=medieval-realms connect_timeout=10 user=postgres password=Hufflepuff4life");
    let s = move || pgsess.clone();

    let signup = s().and(path("signup"))
                    .and(body::json())
                    .and_then(do_signup);

    let logout = s().and(path("logout"))
                    .and_then(do_logout);

    let login = s().and(path("login"))
                    .and(body::json())
                    .and_then(do_login);

    let create_game = s().and(path("create"))
                    .and(body::json())
                    .and_then(do_create_game);
    let join_game = s().and(path("join"))
                    .and(body::json())
                    .and_then(do_join_game);
    // let get_games = s().and(warp::path::param::<i32>())
    //                 .and_then(do_get_games);

    let game = warp::path("game").and(create_game.or(join_game));

    // let game_get = warp::path("game").and(get_games);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_headers(vec!["Content-Type"])
        .allow_methods(vec!["POST", "GET"]);

    let post = warp::post2().and(signup.or(logout).or(login).or(game));
    // let get = warp::get2().and(get_games);

    // let routes = post.or(get).with(cors);
    let routes = post.with(cors).with(warp::log("cors test"));

    warp::serve(routes).run(([127, 0, 0, 1], 3030));
}