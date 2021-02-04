import create from 'zustand';

/*
This is a general store for our local state
 */

const initialQuestions = [];

const store = (set) => ({
  questions: initialQuestions,
  setQuestions: (questions) => set(() => ({ questions })),
});
// a callback function which returns an object
// describing state
export const useStore = create(store);
// storing the returned hook as useStore
