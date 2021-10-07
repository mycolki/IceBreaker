import { createSlice } from '@reduxjs/toolkit';

import { getRandomList } from '../utils/getRandomList';

const name = 'quiz';
const QUIZ_LENGTH = 7;
const initialState = {
  questions: [],
  currentQuestion: null,
  isImageLoaded: false,
  questionResult: '',
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
    showQuestionResult(state, action) {
      state.questionResult = action.payload;
    },
    showAnswerBoxByInput(state, action) {
      state.userInput = action.payload;
    },
  },
});

export const {
  saveQuizData,
  activateSubmit,
  showMessage,
  showQuestionResult,
  showAnswerBoxByInput,
} = quizSlice.actions;

export default quizSlice.reducer;
