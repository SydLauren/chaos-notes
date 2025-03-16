import { Lens, lensProp, view } from 'ramda';
import { MatrixNote } from '@/lib/types';

const aboveLens = lensProp<MatrixNote, 'aboveNote'>('aboveNote');
const belowLens = lensProp<MatrixNote, 'belowNote'>('belowNote');
const rightLens = lensProp<MatrixNote, 'rightNote'>('rightNote');
const leftLens = lensProp<MatrixNote, 'leftNote'>('leftNote');

const getDirectionNote =
  (lens: Lens<MatrixNote, string | undefined>) =>
  (allNotes: MatrixNote[]) =>
  (currentNote: MatrixNote) => {
    // get id
    const nextId = view(lens, currentNote);
    // find note by id
    if (!nextId || !allNotes || allNotes?.length === 0) {
      return;
    }

    const nextNote = allNotes?.find((note) => note?.id === nextId);

    return nextNote;
  };

const getAboveNote = getDirectionNote(aboveLens);
const getBelowNote = getDirectionNote(belowLens);
const getLeftNote = getDirectionNote(leftLens);
const getRightNote = getDirectionNote(rightLens);

export const getAllNotesInDirection =
  (
    getDirectionNote: (
      allNotes: MatrixNote[],
    ) => (currentNote: MatrixNote) => MatrixNote | undefined,
  ) =>
  (
    currentNote: MatrixNote | undefined,
    allNotes: MatrixNote[],
    notesAbove: MatrixNote[],
  ): MatrixNote[] => {
    if (!currentNote) {
      return notesAbove;
    }

    const nextNote = getDirectionNote(allNotes)(currentNote);

    if (nextNote) {
      notesAbove.push(nextNote);
      getAllNotesInDirection(getDirectionNote)(nextNote, allNotes, notesAbove);
    }

    return notesAbove;
  };

export const getAllNotesAbove = getAllNotesInDirection(getAboveNote);
export const getAllNotesBelow = getAllNotesInDirection(getBelowNote);
export const getAllNotesLeft = getAllNotesInDirection(getLeftNote);
export const getAllNotesRight = getAllNotesInDirection(getRightNote);

export const useMatrixNotes = (
  allNotes: MatrixNote[],
  currentNoteId: string,
) => {
  const currentMatrixNote = (allNotes || []).find(
    (note) => note.id === currentNoteId,
  );

  const aboveNotes = getAllNotesAbove(currentMatrixNote, allNotes, []);
  const belowNotes = getAllNotesBelow(currentMatrixNote, allNotes, []);
  const rightNotes = getAllNotesLeft(currentMatrixNote, allNotes, []);
  const leftNotes = getAllNotesLeft(currentMatrixNote, allNotes, []);

  return {
    aboveNotes,
    belowNotes,
    rightNotes,
    leftNotes,
  };
};
