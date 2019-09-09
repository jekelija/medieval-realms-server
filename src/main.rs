extern crate ws;
extern crate json;
extern crate uuid;


use std::rc::Rc;
use std::cell::Cell;
use std::collections::HashMap;

use ws::{listen, Handler, Sender, Result, Message, Handshake, CloseCode};

use uuid::Uuid;

struct Server {
    out: Sender,
    count: Rc<Cell<u32>>,
    waiting_games: HashMap<String,String>
}

impl Handler for Server {

    fn on_open(&mut self, _: Handshake) -> Result<()> {
        // We have a new connection, so we increment the connection counter
        Ok(self.count.set(self.count.get() + 1))
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {
        // Parse the string of data into serde_json::Value.
        let parsed = json::parse(msg.as_text()?).unwrap();
        println!("The number of live connections is {}", self.count.get());

        if parsed["type"] == "GameStart" {
            let new_uuid = Uuid::new_v4().to_hyphenated().to_string();
            let new_uuid_to_send = new_uuid.clone();
            self.waiting_games.insert(new_uuid, r#""#.to_string());//TODO store game data

            let return_msg = json::object!{
                "type" => "GameCreated",
                "uuid" => new_uuid_to_send
            };

            self.out.send(return_msg.dump())
        }
        else if parsed["type"] == "GameJoin" {
            let uuid = parsed["gameUUID"].as_str().unwrap();

            if self.waiting_games.contains_key(uuid) {
                let return_msg = json::object!{
                    "type" => "GameJoined"
                };

                self.out.send(return_msg.dump())
            }
            else {
                let return_msg = json::object!{
                    "type" => "GameJoined",
                    "error" => "Could not find game"
                };

                self.out.send(return_msg.dump())
            }

            
        }
        else {
            // Echo the message back
            self.out.send(msg)
        }
        
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal => println!("The client is done with the connection."),
            CloseCode::Away   => println!("The client is leaving the site."),
            CloseCode::Abnormal => println!(
                "Closing handshake failed! Unable to obtain closing status from client."),
            _ => println!("The client encountered an error: {}", reason),
        }

        // The connection is going down, so we need to decrement the count
        self.count.set(self.count.get() - 1)
    }

    fn on_error(&mut self, err: ws::Error) {
        println!("The server encountered an error: {:?}", err);
    }

}

fn main() {
  // Cell gives us interior mutability so we can increment
  // or decrement the count between handlers.
  // Rc is a reference-counted box for sharing the count between handlers
  // since each handler needs to own its contents.
  let count = Rc::new(Cell::new(0));
  listen("127.0.0.1:3012", |out| { Server { out: out, count: count.clone(), waiting_games: HashMap::new() } }).unwrap()
} 