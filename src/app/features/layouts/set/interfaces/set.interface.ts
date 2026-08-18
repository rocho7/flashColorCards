import { ICard } from '../../card/interface/card.interface';

export interface ISet {
  id: number;
  title: string;
  total: number;
  remain: number;
  new: number;
  learning: number;
  review: number;
  color: string;
  cards: Array<ICard>;
}
