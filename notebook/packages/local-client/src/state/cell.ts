export type CellType = 'CODE' | 'TEXT';

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
