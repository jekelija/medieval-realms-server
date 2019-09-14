table! {
    games (id) {
        id -> Integer,
        player1_id -> Integer,
        player2_id -> Integer,
        player1_data -> Jsonb,
        player2_data -> Jsonb,
        state -> Integer,
        shared_data -> Jsonb,
    }
}

table! {
    sessions (id) {
        id -> Integer,
        cookie -> Varchar,
        user_id -> Integer,
    }
}

table! {
    users (id) {
        id -> Integer,
        username -> Varchar,
        name -> Varchar,
        password -> Varchar,
        salt -> Varchar,
    }
}

joinable!(sessions -> users (user_id));

allow_tables_to_appear_in_same_query!(sessions, users);
allow_tables_to_appear_in_same_query!(games, users);