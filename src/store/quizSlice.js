import { createSlice } from '@reduxjs/toolkit';
const QUIZ_LENGTH = 7;

const name = 'quiz';
const initialState = {
  questions: [],
  currentQuestion: null,
  score: 0,
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveQuizData(state, action) {
      const randoms = [...Object.values(action.payload)];

      for (let i = 0; i < randoms.length; i++) {
        const temp = Math.floor(Math.random() * (i + 1));
        [randoms[i], randoms[temp]] = [randoms[temp], randoms[i]];
      }

      state.questions = randoms.slice(0, QUIZ_LENGTH);

      state.currentQuestion = state.questions.pop();
      state.currentQuestion.level = 1;
    },
  },
});

export const { saveQuizData } = quizSlice.actions;
export default quizSlice.reducer;
