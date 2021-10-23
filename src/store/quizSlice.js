import { createSlice } from '@reduxjs/toolkit';

import { shuffle } from 'lodash';
import { QUIZ, QUIZ_LENGTH, SCORES } from '../constants/game';

const name = QUIZ;
const initialState = {
  quiz: {},
  questions: [],
  currentQuestion: null,
  isImgLoaded: false,
  isAnswerTime: false,
  isTimeOver: false,
  userInput: '',
  message: {
    type: '',
    text: '',
  },
  score: 0,
  error: null,
  hints: 5,
  currentSecond: 0,
  isOpenedHint: false,
  isClosedHint: false,
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveQuizData(state, action) {
      state.quiz = action.payload;
      const allQuestions = Object.values(state.quiz);
      state.questions = shuffle(allQuestions).slice(0, QUIZ_LENGTH);
    },
    replaceQuestions(state, action) {
      state.questions = action.payload;
    },
    getFirstLevel(state) {
      state.currentQuestion = state.questions.pop();
      state.currentQuestion.level = 1;
    },
    loadImage(state, action) {
      state.isImgLoaded = action.payload;
    },
    showForm(state, action) {
      state.isAnswerTime = action.payload;
    },
    showResult(state, action) {
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
    takeHint(state, action) {
      if (action.payload === 5) {
        void (state.hints = 5);
        return;
      }

      if (action.payload === 1) {
        state.currentSecond += 10;
      }

      state.hints -= action.payload;
    },
    stopCount(state, action) {
      state.isOpenedHint = action.payload;
    },
    countAgain(state, action) {
      state.isClosedHint = action.payload;
    },
    rememberSecond(state, action) {
      state.currentSecond = action.payload;
    },
    resetScore(state) {
      state.score = 0;
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
  loadImage,
  showForm,
  showResult,
  showMessage,
  showAnswerBoxByInput,
  passNextLevel,
  addScore,
  takeHint,
  stopCount,
  countAgain,
  rememberSecond,
  resetScore,
  onError,
} = quizSlice.actions;

export default quizSlice.reducer;
