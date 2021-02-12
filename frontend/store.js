import create from 'zustand';

/*
This is a general store for our local state
 */

const initialQuestions = [];
const initialSelections = [];
const initalResultsPerCategory = [];
const initialEmail = '';

const store = (set) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  resultsPerCategory: initalResultsPerCategory,
  setQuestions: (questions) => set(() => ({
    questions,
    selections: new Array(questions.length).fill(-1),
  })),
  setEmail: (newEmail) => set(() => ({ email: newEmail })),
  setSelections: (newSelections) => set(() => ({ selections: newSelections })),
  setResultsPerCategory: (results) => set(() => ({ resultsPerCategory: results })),
});
// a callback function which returns an object
// describing state
export const useStore = create(store);
// storing the returned hook as useStore
