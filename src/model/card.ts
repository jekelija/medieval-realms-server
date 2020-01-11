import {getRandomString} from '../utils';

export enum Faction {
    Orcs= 0,
    Knights= 1,
    Elves= 2,
    Dwarves= 3,
    None= 4
}

export class Card {
    public id: string = getRandomString(16);
    public faction: Faction;

    public cost: number = Math.floor(Math.random() * 8);
    public trade: number = Math.floor(Math.random() * 4);
    public authority: number = Math.floor(Math.random() * 3);
    public attack: number = Math.floor(Math.random() * 5);

    public trashTrade: number = 0;
    public trashAuthority: number = 0;
    public trashAttack: number = 0;
}
