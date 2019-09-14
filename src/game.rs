extern crate serde_json;

use crate::session::{Session};
use crate::schema;
use crate::models::GameState;

use serde::Deserialize;

use diesel::insert_into;
use diesel::prelude::*;

use warp::http::{Response, StatusCode};
use warp::{
    reject::{custom}, Rejection, Reply,
};

#[derive(Deserialize)]
pub struct NewGameData {
    created_by: i32,
    initial_state: serde_json::Value,
    shared_state: serde_json::Value,
}

pub fn do_create_game(
    session: Session,
    form: NewGameData,
) -> Result<impl Reply, Rejection> {
    use schema::games::dsl::*;
    let result = insert_into(games)
        .values((
            player1_id.eq(form.created_by),
            player1_data.eq(form.initial_state),
            shared_data.eq(form.shared_state),
            state.eq(GameState::CREATED as i32), 
        ))
        .execute(session.db())
        .map_err(|e| {
            format!("Error: {}", e)
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

//TODO find game by id, set my data, and get shared data back
pub fn do_join_game(
    session: Session,
    form: NewGameData,
) -> Result<impl Reply, Rejection> {
    use schema::games::dsl::*;
    let result = insert_into(games)
        .values((
            player2_id.eq(form.created_by),
            player2_data.eq(form.initial_state),
        ))
        .execute(session.db())
        .map_err(|e| {
            format!("Error: {}", e)
        });
    match result {
        Ok(_) => {
            Response::builder()
                .status(StatusCode::OK)
                .body(b"".to_vec())
                .map_err(custom)
        }
        Err(msg) => {
            Err(warp::reject::custom(msg))
        }
    }
}