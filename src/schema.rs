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