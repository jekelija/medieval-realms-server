import {Card} from './card';

export interface IDeck {
    cards: Card[];
}

export const Deck: IDeck = {
    cards : [
        {
            id: '0',
            faction: 0, // Orcs= 0, Knights= 1, Elves= 2, Dwarves= 3, None= 4
            name: 'Example',
            isBase: false,
            cost: 4,
            trade: 2,
            authority: 0,
            attack: 2,
            extraActions: [{
                type: 0, // draw a card
                modifier: 2 // draw 2 cards
            }],
            extraTrashActions: [],
            extraFactionActions: [],
            trashTrade: 2,
            trashAuthority: 0,
            trashAttack: 0,
            factionBonusTrade: 2,
            factionBonusAuthority: 0,
            factionBonusAttack: 0,
            imageFilename: 'example_image.jpg'
        }
    ]
};
