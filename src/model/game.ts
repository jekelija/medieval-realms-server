import { Chat } from "./chat";
import { PlayerState } from "./playerstate";
import { SharedState } from "./sharedstate";

export enum GAME_STATE {
    CREATED= 0,
    USER1_TURN= 10,
    USER2_TURN= 11,
    USER1_WON= 20,
    USER2_WON= 21,
    DRAW= 22
}

export interface IGame {
    gamestate: GAME_STATE;
    user1_data: PlayerState;
    user2_data: PlayerState;
    shared_data: SharedState;
    chatHistory: Chat[];
    createdate: number; // epoch time
    gameid: string;
    user1: string;
    user2: string;
}
