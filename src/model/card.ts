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
    DESTROY_TARGET_BASE= 6,
    ACQUIRE_CARD_TO_TOP_OF_DECK= 7,
    FIVE_DAMAGE_OR_DRAW_PER_ORC= 8,
    ONE_TRADE_OR_RECYCLE_TWO= 9,
    ATTACK_PER_SHIP= 10,
    DRAW_IF_TWO_BASE= 11,
    CHOOSE_ONE= 12,
    CLONE_CARD= 13,
    ALLY_FOR_ALL= 14,
    TRASH_CARD_HAND= 15,
    TRASH_CARD_THEN_DRAW= 16
}

export interface ICardAction {
    type: CardActionType;
    // only needed for certain types.
    // For example, if type is draw card, no modifier == draw 1 card. if modifier is 2, draw 2 cards
    modifier?: any;
}

export interface ICard {
    uuid?: string;
    id: string;
    faction: Faction;

    name: string;
    isBase: boolean;
    isOutpost: boolean;
    baseDefense: number;

    cost: number;
    trade: number;
    authority: number;
    attack: number;

    trashTrade: number;
    trashAuthority: number;
    trashAttack: number;

    factionBonusTrade: number;
    factionBonusAuthority: number;
    factionBonusAttack: number;
    imageFilename: string;

    extraActions: ICardAction[];
    extraFactionActions: ICardAction[];
    extraTrashActions: ICardAction[];
}
