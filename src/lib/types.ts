export interface MatrixNote {
  id: string;
  title?: string;
  content: string;
  leftNote?: string; // MatrixNote id
  rightNote?: string; // MatrixNote id
  belowNote?: string; // MatrixNote id
  aboveNote?: string; // MatrixNote id
}
