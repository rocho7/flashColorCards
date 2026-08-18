export interface ICard {
  id: number;
  idSet?: number;
  title: string;
  review: number;
  forgotten: number;
  daysOverdue?: number;
  answer: string;
  color: string;
  delay: number | null;
}
