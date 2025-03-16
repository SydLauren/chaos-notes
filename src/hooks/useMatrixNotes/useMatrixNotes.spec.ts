import { MatrixNote } from '@/lib/types';
import { getAllNotesAbove } from './useMatrixNotes';

const testNotes: MatrixNote[] = [
  {
    id: '1',
    content: 'cool',
    aboveNote: '2',
  },
  {
    id: '2',
    content: 'wow',
    aboveNote: '3',
    belowNote: '1',
  },
  {
    id: '3',
    content: 'neat',
    aboveNote: '4',
    belowNote: '2',
  },
  {
    id: '4',
    content: 'jeepers',
    belowNote: '3',
  },
];

describe('test helpers', () => {
  test('getAllNotesAbove should work', () => {
    const aboveNotes = getAllNotesAbove(testNotes[0], testNotes, []);
    expect(aboveNotes).toEqual([
      { ...testNotes[1] },
      { ...testNotes[2] },
      { ...testNotes[3] },
    ]);
  });
  test('getAllNotesAbove should return [] if there are none', () => {
    const aboveNotes = getAllNotesAbove(testNotes[3], testNotes, []);
    expect(aboveNotes).toEqual([]);
  });
});
