import { createSlice } from '@reduxjs/toolkit';

import { getRandomQuestions } from '../utils/getRandomQuestions';
import { QUIZ, QUIZ_LENGTH, SCORES } from '../constants/game';

const name = QUIZ;
const initialState = {
  questions: [],
  currentQuestion: null,
  isImageLoaded: false,
  isNotBreaking: false,
  isTimeOver: false,
  userInput: '',
  message: {
    type: '',
    text: '',
  },
  score: 0,
  error: null,
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveQuizData(state, action) {
      const allQuestions = Object.values(action.payload);
      const randomQuestions = getRandomQuestions(allQuestions);

      state.questions = randomQuestions.slice(0, QUIZ_LENGTH);
      state.currentQuestion = state.questions.pop();
      state.currentQuestion.level = 1;
    },
    activateBreaking(state) {
      state.isImageLoaded = true;
    },
    toggleForm(state, action) {
      state.isNotBreaking = action.payload;
    },
    toggleAnswer(state, action) {
      state.isTimeOver = action.payload;
    },
    showMessage(state, action) {
      const { type, text } = action.payload;
      state.message.type = type;
      state.message.text = text;
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
    addScore(state) {
      const currentLevel = state.currentQuestion.level;
      state.score += SCORES[`Lv${currentLevel}`];
    },
    onError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  saveQuizData,
  activateBreaking,
  toggleForm,
  toggleAnswer,
  showMessage,
  showAnswerBoxByInput,
  passNextLevel,
  addScore,
  onError,
} = quizSlice.actions;

export default quizSlice.reducer;
