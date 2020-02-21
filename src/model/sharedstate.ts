import {ICard} from './card';
import { TurnInfo } from './turninfo';

export class SharedState {
    public tradeRow: ICard[] = [];
    public drawPile: ICard[] = [];
    public halflings: ICard[] = [];
    public turnHistory: TurnInfo[] = [];
}
