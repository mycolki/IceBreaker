import { createSlice } from '@reduxjs/toolkit';

import _ from 'lodash';
import { QUIZ, QUIZ_LENGTH, SCORES } from '../constants/game';

const name = QUIZ;
const initialState = {
  quiz: {},
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
      state.quiz = action.payload;
      const allQuestions = Object.values(state.quiz);
      state.questions = _.shuffle(allQuestions).slice(0, QUIZ_LENGTH);
    },
    replaceQuestions(state, action) {
      state.questions = action.payload;
    },
    getFirstLevel(state) {
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
      console.log('패스!');
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
  replaceQuestions,
  getFirstLevel,
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
