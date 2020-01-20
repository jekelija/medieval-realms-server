import {getRandomString} from '../utils';

export enum Faction {
    Orcs= 0,
    Knights= 1,
    Elves= 2,
    Dwarves= 3,
    None= 4
}

export enum CardActionType {
    DRAW_CARD= 0,
    DISCARD_CARD= 1,
    TRASH_CARD= 2,
    NEXT_SHIP_TO_TOP_OF_DECK= 3,
    OPPONENT_DISCARD= 4,
    TRASH_IN_TRADE_ROW= 5,
}

export interface ICardAction {
    type: CardActionType;
    // only needed for certain types.
    // For example, if type is draw card, no modifier == draw 1 card. if modifier is 2, draw 2 cards
    modifier?: number;
}

export class Card {
    public id: string = getRandomString(16);
    public faction: Faction;

    public name: string = 'Test Card';
    public isBase: boolean = Math.random() < .2;
    public isOutpost: boolean = Math.random() < .2;
    public baseDefense: number = Math.floor(Math.random() * 8);

    public cost: number = Math.floor(Math.random() * 8);
    public trade: number = Math.floor(Math.random() * 4);
    public authority: number = Math.floor(Math.random() * 3);
    public attack: number = Math.floor(Math.random() * 5);

    public trashTrade: number = 0;
    public trashAuthority: number = 0;
    public trashAttack: number = 0;

    public factionBonusTrade: number = 2;
    public factionBonusAuthority: number = 0;
    public factionBonusAttack: number = 0;
    public imageFilename: string = 'example_image.jpg';

    public extraActions: ICardAction[] = [];
    public extraFactionActions: ICardAction[] = [];
    public extraTrashActions: ICardAction[] = [];
}
