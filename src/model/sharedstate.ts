import {Card} from './card';
import { TurnInfo } from './turninfo';

export class SharedState {
    public tradeRow: Card[] = [];
    public drawPile: Card[] = [];
    public halflings: Card[] = [];
    public turnHistory: TurnInfo[] = [];
}
