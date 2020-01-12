import {Card} from './card';

export class PlayerState {
    public drawPile: Card[] = [];
    public hand: Card[] = [];
    public discardPile: Card[] = [];
    public health: number = 50;
}
