import create from 'zustand';

/*
This is a general store for our local state
 */

const initialQuestions = [];
const initialEmail = '';

const store = (set) => ({
  questions: initialQuestions,
  email: initialEmail,
  setQuestions: (questions) => set(() => ({ questions })),
  setEmail: (newEmail) => set(() => ({ email: newEmail })),
});
// a callback function which returns an object
// describing state
export const useStore = create(store);
// storing the returned hook as useStore
