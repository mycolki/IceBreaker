import { createSlice } from '@reduxjs/toolkit';

import { getRandomList } from '../utils/getRandomList';

const name = 'quiz';
const QUIZ_LENGTH = 7;
const initialState = {
  questions: [],
  currentQuestion: null,
  isImageLoaded: false,
  userInput: '',
  message: '',
  score: 0,
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveQuizData(state, action) {
      const allQuestions = Object.values(action.payload);
      const randomQuestions = getRandomList(allQuestions);

      state.questions = randomQuestions.slice(0, QUIZ_LENGTH);
      state.currentQuestion = state.questions.pop();
      state.currentQuestion.level = 1;
    },
    activateSubmit(state) {
      state.isImageLoaded = true;
    },
    showMessage(state, action) {
      state.message = action.payload;
    },
    showAnswerBoxByInput(state, action) {
      state.userInput = action.payload;
    },
    passNextLevel(state) {
      const currentLevel = state.currentQuestion.level;
      const nextQuestion = state.questions.pop();
      nextQuestion.level = currentLevel + 1;
      state.currentQuestion = nextQuestion;
    },
  },
});

export const {
  saveQuizData,
  activateSubmit,
  showMessage,
  showAnswerBoxByInput,
  passNextLevel,
} = quizSlice.actions;

export default quizSlice.reducer;
