import {Card, CardActionType, Faction} from './card';

export interface IDeck {
    cards: Array<{card: Card, qty: number}>;
}

export const HalflingDeck: Array<{card: Card, qty: number}> = [
    {
        qty: 10,
        card: {
            id: '200',
            faction: Faction.None,
            name: 'Halfling',
            isBase: false,
            isOutpost: false,
            baseDefense: 0,
            cost: 2,
            trade: 2,
            authority: 0,
            attack: 0,
            extraActions: [],
            extraTrashActions: [],
            extraFactionActions: [],
            trashTrade: 0,
            trashAuthority: 0,
            trashAttack: 2,
            factionBonusTrade: 0,
            factionBonusAuthority: 0,
            factionBonusAttack: 0,
            imageFilename: 'Halfling.jpg'
        }
    }
];

export const StartingDeck: Array<{card: Card, qty: number}> = [
    {
        qty: 8,
        card: {
            id: '100',
            faction: Faction.None,
            name: 'Serf',
            isBase: false,
            isOutpost: false,
            baseDefense: 0,
            cost: 0,
            trade: 1,
            authority: 0,
            attack: 0,
            extraActions: [],
            extraTrashActions: [],
            extraFactionActions: [],
            trashTrade: 0,
            trashAuthority: 0,
            trashAttack: 0,
            factionBonusTrade: 0,
            factionBonusAuthority: 0,
            factionBonusAttack: 0,
            imageFilename: 'Serf.jpg'
        }
    },
    {
        qty: 2,
        card: {
            id: '101',
            faction: Faction.None,
            name: 'Robber',
            isBase: false,
            isOutpost: false,
            baseDefense: 0,
            cost: 0,
            trade: 0,
            authority: 0,
            attack: 1,
            extraActions: [],
            extraTrashActions: [],
            extraFactionActions: [],
            trashTrade: 0,
            trashAuthority: 0,
            trashAttack: 0,
            factionBonusTrade: 0,
            factionBonusAuthority: 0,
            factionBonusAttack: 0,
            imageFilename: 'Robber.jpg'
        }
    }
];

export const Deck: IDeck = {
    cards : [
        {
            qty: 3,
            card: {
                id: '0',
                faction: Faction.Orcs,
                name: 'Spearman',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 1,
                trade: 0,
                authority: 0,
                attack: 3,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Orc Spearman.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '1',
                faction: Faction.Orcs,
                name: 'Raider',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 4,
                trade: 0,
                authority: 0,
                attack: 6,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DESTROY_TARGET_BASE
                }, {
                    type: CardActionType.TRASH_IN_TRADE_ROW
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Orc Raider.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '2',
                faction: Faction.Orcs,
                name: 'Warthog Rider',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 3,
                trade: 0,
                authority: 0,
                attack: 5,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 3,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Orc Warthog Rider.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '3',
                faction: Faction.Orcs,
                name: 'Axe Thrower',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 2,
                trade: 0,
                authority: 0,
                attack: 4,
                extraActions: [{
                    type: CardActionType.TRASH_IN_TRADE_ROW
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Orc Axe Thrower.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '4',
                faction: Faction.Orcs,
                name: 'Grunt',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 2,
                trade: 3,
                authority: 0,
                attack: 0,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Orc Grunt.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '5',
                faction: Faction.Orcs,
                name: 'Cannoneer',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 8,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 4,
                imageFilename: 'Units/Orc Cannoneer.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '6',
                faction: Faction.Orcs,
                name: 'Siege Tower',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 7,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.ACQUIRE_CARD_TO_TOP_OF_DECK
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Orc Siege Tower.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '7',
                faction: Faction.Orcs,
                name: 'Siege Croc',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 7,
                trade: 0,
                authority: 0,
                attack: 6,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Orc Siege Croc.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '8',
                faction: Faction.Orcs,
                name: 'Overnight Camp',
                isBase: true,
                isOutpost: false,
                baseDefense: 5,
                cost: 3,
                trade: 0,
                authority: 0,
                attack: 1,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 3,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Orc Overnight Camp.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '9',
                faction: Faction.Orcs,
                name: 'Trench Network',
                isBase: true,
                isOutpost: false,
                baseDefense: 5,
                cost: 5,
                trade: 0,
                authority: 0,
                attack: 3,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 3,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Orc Trench Network.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '10',
                faction: Faction.Orcs,
                name: 'Log Fort',
                isBase: true,
                isOutpost: false,
                baseDefense: 8,
                cost: 8,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.FIVE_DAMAGE_OR_DRAW_PER_ORC
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Orc Log Fort.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '11',
                faction: Faction.Knights,
                name: 'Pikeman',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 1,
                trade: 0,
                authority: 0,
                attack: 2,
                extraActions: [{
                    type: CardActionType.DISCARD_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Knight Pikeman.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '12',
                faction: Faction.Knights,
                name: 'Cavalry',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 3,
                trade: 0,
                authority: 0,
                attack: 4,
                extraActions: [{
                    type: CardActionType.DISCARD_CARD
                }],
                extraTrashActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Knight Cavalry.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '13',
                faction: Faction.Knights,
                name: 'Swordsman',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 2,
                trade: 0,
                authority: 0,
                attack: 1,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Knight Swordsman.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '14',
                faction: Faction.Knights,
                name: 'Blacksmith',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 3,
                trade: 1,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraTrashActions: [{
                    type: CardActionType.DISCARD_CARD
                }],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Knight Blacksmith.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '15',
                faction: Faction.Knights,
                name: 'Catapult',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 5,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraTrashActions: [{
                    type: CardActionType.DRAW_CARD
                }, {
                    type: CardActionType.DESTROY_TARGET_BASE
                }],
                extraFactionActions: [{
                    type: CardActionType.DISCARD_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Knight Catapult.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '16',
                faction: Faction.Knights,
                name: 'Ballista',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 7,
                trade: 0,
                authority: 0,
                attack: 7,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 5,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Knight Ballista.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '17',
                faction: Faction.Knights,
                name: 'Tower',
                isBase: true,
                isOutpost: true,
                baseDefense: 4,
                cost: 4,
                trade: 0,
                authority: 0,
                attack: 2,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 4,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Bases/Orc Tower.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '18',
                faction: Faction.Knights,
                name: 'Smithy',
                isBase: true,
                isOutpost: true,
                baseDefense: 4,
                cost: 4,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.ONE_TRADE_OR_RECYCLE_TWO
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Orc Smithy.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '19',
                faction: Faction.Knights,
                name: 'Turret',
                isBase: true,
                isOutpost: true,
                baseDefense: 5,
                cost: 5,
                trade: 0,
                authority: 0,
                attack: 3,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 4,
                imageFilename: 'Bases/Orc Turret.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '20',
                faction: Faction.Knights,
                name: 'Drawbridge',
                isBase: true,
                isOutpost: true,
                baseDefense: 6,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 3,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DISCARD_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Orc Drawbridge.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '21',
                faction: Faction.Knights,
                name: 'Castle',
                isBase: true,
                isOutpost: false,
                baseDefense: 8,
                cost: 8,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.ATTACK_PER_SHIP
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Orc Castle.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '22',
                faction: Faction.Elves,
                name: 'Emmisary',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 1,
                trade: 2,
                authority: 0,
                attack: 0,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 4,
                factionBonusAttack: 0,
                imageFilename: 'Units/Elf Emmisary.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '23',
                faction: Faction.Elves,
                name: 'Messenger',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 4,
                trade: 4,
                authority: 0,
                attack: 0,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.NEXT_SHIP_TO_TOP_OF_DECK
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Elf Messenger.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '24',
                faction: Faction.Elves,
                name: 'Ambassador',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 3,
                trade: 2,
                authority: 3,
                attack: 0,
                extraActions: [{
                    type: CardActionType.DRAW_IF_TWO_BASE,
                    modifier: 2
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Elf Ambassador.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '25',
                faction: Faction.Elves,
                name: 'Archer',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 2,
                trade: 2,
                authority: 4,
                attack: 0,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 4,
                imageFilename: 'Units/Elf Archer.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '26',
                faction: Faction.Elves,
                name: 'Scout',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 5,
                trade: 0,
                authority: 4,
                attack: 4,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Elf Scout.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '27',
                faction: Faction.Elves,
                name: 'Ranger',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 5,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 5,
                factionBonusAttack: 0,
                imageFilename: 'Units/Elf Ranger.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '28',
                faction: Faction.Elves,
                name: 'Griffin Riders',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 8,
                trade: 0,
                authority: 4,
                attack: 5,
                extraActions: [{
                    type: CardActionType.DRAW_CARD,
                    modifier: 2
                }],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DESTROY_TARGET_BASE
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Elf Griffin Riders.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '29',
                faction: Faction.Elves,
                name: 'Forward Camp',
                isBase: true,
                isOutpost: true,
                baseDefense: 5,
                cost: 5,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.CHOOSE_ONE,
                    modifier: {
                        attack: 2,
                        authority: 3
                    }
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Bases/Elf Forward Camp.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '30',
                faction: Faction.Elves,
                name: 'Trading Post',
                isBase: true,
                isOutpost: true,
                baseDefense: 4,
                cost: 3,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.CHOOSE_ONE,
                    modifier: {
                        attack: 1,
                        health: 1
                    }
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Elf Trading Post.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '31',
                faction: Faction.Elves,
                name: 'Elven Village',
                isBase: true,
                isOutpost: false,
                baseDefense: 4,
                cost: 4,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.CHOOSE_ONE,
                    modifier: {
                        attack: 2,
                        health: 2
                    }
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Elf Village.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '32',
                faction: Faction.Elves,
                name: 'Elven Fortress',
                isBase: true,
                isOutpost: false,
                baseDefense: 6,
                cost: 7,
                trade: 2,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.NEXT_SHIP_TO_TOP_OF_DECK
                }],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Elf Fortress.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '33',
                faction: Faction.Elves,
                name: 'Elven City',
                isBase: true,
                isOutpost: true,
                baseDefense: 6,
                cost: 6,
                trade: 3,
                authority: 0,
                attack: 0,
                extraActions: [],
                extraTrashActions: [{
                    type: CardActionType.DRAW_CARD,
                }, {
                    type: CardActionType.DESTROY_TARGET_BASE
                }],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Elf City.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '34',
                faction: Faction.Dwarves,
                name: 'Miner',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 1,
                trade: 1,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.TRASH_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Dwarf Miner.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '35',
                faction: Faction.Dwarves,
                name: 'Hammerman',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 2,
                trade: 0,
                authority: 0,
                attack: 2,
                extraActions: [{
                    type: CardActionType.TRASH_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Dwarf Hammerman.jpg'
            }
        },
        {
            qty: 3,
            card: {
                id: '36',
                faction: Faction.Dwarves,
                name: 'Smelter',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 3,
                trade: 2,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.TRASH_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 2,
                imageFilename: 'Units/Dwarf Smelter.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '37',
                faction: Faction.Dwarves,
                name: 'Axeman',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 5,
                trade: 0,
                authority: 0,
                attack: 4,
                extraActions: [{
                    type: CardActionType.TRASH_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Dwarf Axeman.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '38',
                faction: Faction.Dwarves,
                name: 'Shoveler',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 4,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.CHOOSE_ONE,
                    modifier: {
                        trade: 3,
                        attack: 5
                    }
                }],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.TRASH_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Dwarf Shoveler.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '39',
                faction: Faction.Dwarves,
                name: 'Woodworker',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 4,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.CLONE_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Dwarf Woodworker.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '40',
                faction: Faction.Dwarves,
                name: 'Crossbowman',
                isBase: false,
                isOutpost: false,
                baseDefense: 0,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 6,
                extraActions: [{
                    type: CardActionType.DESTROY_TARGET_BASE
                }],
                extraTrashActions: [],
                extraFactionActions: [{
                    type: CardActionType.DRAW_CARD
                }],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Units/Dwarf Crossbowman.jpg'
            }
        },
        {
            qty: 2,
            card: {
                id: '41',
                faction: Faction.Dwarves,
                name: 'Battering Ram',
                isBase: true,
                isOutpost: true,
                baseDefense: 5,
                cost: 3,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 5,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Dwarf Battering Ram.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '42',
                faction: Faction.Dwarves,
                name: 'Iron Mine',
                isBase: true,
                isOutpost: true,
                baseDefense: 6,
                cost: 7,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.DRAW_CARD
                }, {
                    type: CardActionType.TRASH_CARD_HAND
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Dwarf Iron Mine.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '43',
                faction: Faction.Dwarves,
                name: 'Steel Smelter',
                isBase: true,
                isOutpost: true,
                baseDefense: 5,
                cost: 6,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.TRASH_CARD
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Dwarf Steel Smelter.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '44',
                faction: Faction.Dwarves,
                name: 'Copper Mine',
                isBase: true,
                isOutpost: true,
                baseDefense: 5,
                cost: 5,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.ALLY_FOR_ALL
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Dwarf Copper Mine.jpg'
            }
        },
        {
            qty: 1,
            card: {
                id: '45',
                faction: Faction.Dwarves,
                name: 'Mountain Fortress',
                isBase: true,
                isOutpost: true,
                baseDefense: 6,
                cost: 8,
                trade: 0,
                authority: 0,
                attack: 0,
                extraActions: [{
                    type: CardActionType.TRASH_CARD_THEN_DRAW,
                    modifier: 2
                }],
                extraTrashActions: [],
                extraFactionActions: [],
                trashTrade: 0,
                trashAuthority: 0,
                trashAttack: 0,
                factionBonusTrade: 0,
                factionBonusAuthority: 0,
                factionBonusAttack: 0,
                imageFilename: 'Bases/Dwarf Mountain Fortress.jpg'
            }
        }
    ]
};
