extern crate serde_json;

use crate::session::{Session};
use crate::schema;
use crate::models::GameState;

use serde::{Deserialize,Serialize};

use diesel::insert_into;
use diesel::prelude::*;

use warp::{
    Rejection, Reply,
};

#[derive(Deserialize)]
pub struct NewGameData {
    initial_state: serde_json::Value,
    shared_state: serde_json::Value,
}

#[derive(Deserialize)]
pub struct JoinGameData {
    game_id:i32,
    initial_state: serde_json::Value,
}

#[derive(Serialize)]
struct SendNewGameData {
    game_id: i32,
}

#[derive(Serialize)]
struct SendJoinGameData {
    shared_state: serde_json::Value,
}

pub fn do_create_game(
    session: Session,
    form: NewGameData,
) -> Result<impl Reply, Rejection> {
    if session.user.is_none() {
        return Err(warp::reject::custom("Must be logged in"));
    }
    use schema::games::dsl::*;
    let result = insert_into(games)
        .values((
            player1_id.eq(session.user.clone().unwrap().id),
            player1_data.eq(form.initial_state),
            shared_data.eq(form.shared_state),
            state.eq(GameState::CREATED as i32), 
        ))
        .returning(id)
        .get_results::<i32>(session.db())
        .map_err(|e| {
            format!("Error: {}", e)
        });
    match result {
        Ok(_) => {
            let r_val = SendNewGameData { game_id : result.unwrap().pop().unwrap() };
            Ok(warp::reply::json(&r_val))
        }
        Err(msg) => {
            Err(warp::reject::custom(msg))
        }
    }
}

// pub fn do_get_games(
//     session: Session,
//     userId: i32,
// ) -> Result<impl Reply, Rejection> {
//     use schema::games::dsl::*;
//     let result = games
//         .filter(player1_id.eq(userId).or(player2_id.eq(userId)))
//         .load(session.db());
//     match result {
//         Ok(_) => {
//             Response::builder()
//                 .status(StatusCode::OK)
//                 // TODO: Set a session cookie?
//                 .body(result.)
//                 .map_err(custom)
//         }
//         Err(msg) => {
//             Err(warp::reject::custom(msg))
//         }
//     }
// }

//TODO find game by id, set my data, and get shared data back
pub fn do_join_game(
    session: Session,
    form: JoinGameData,
) -> Result<impl Reply, Rejection> {
    if session.user.is_none() {
        return Err(warp::reject::custom("Must be logged in"));
    }
    use schema::games::dsl::*;
    let target = games.filter(id.eq(form.game_id).and(player1_id.ne(session.user.clone().unwrap().id)).and(state.eq(GameState::CREATED as i32)));
    let result = diesel::update(target).set((
        player2_id.eq(session.user.clone().unwrap().id),
        player2_data.eq(form.initial_state),
        state.eq(GameState::JOINED as i32), 
    )).returning(shared_data).get_result(session.db())
    .map_err(|e| {
        format!("Error: {}", e)
    });

    match result {
        Ok(_) => {
            let r_val = SendJoinGameData { shared_state: result.unwrap() };
            Ok(warp::reply::json(&r_val))
        }
        Err(msg) => {
            Err(warp::reject::custom(msg))
        }
    }
}