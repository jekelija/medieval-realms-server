import {ICard} from './card';

export class PlayerState {
    public drawPile: ICard[] = [];
    public hand: ICard[] = [];
    public basesInPlay: ICard[] = [];
    public discardPile: ICard[] = [];
    public health: number = 50;
}
