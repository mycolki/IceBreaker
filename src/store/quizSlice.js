import { createSlice } from '@reduxjs/toolkit';

import { getRandomList } from '../utils/getRandomList';
import { QUIZ, QUIZ_LENGTH, SCORES } from '../constants/quiz';

const name = QUIZ;
const initialState = {
  questions: [],
  currentQuestion: null,
  isImageLoaded: false,
  enableSubmit: false,
  isEnd: false,
  userInput: '',
  message: {
    type: '',
    text: '',
  },
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
    toggleForm(state) {
      state.enableSubmit = !state.enableSubmit;
    },
    toggleAnswer(state) {
      state.isEnd = !state.isEnd;
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
      state.score += SCORES[`lv${currentLevel}`];
    },
  },
});

export const {
  saveQuizData,
  activateSubmit,
  toggleForm,
  toggleAnswer,
  showMessage,
  showAnswerBoxByInput,
  passNextLevel,
  addScore,
} = quizSlice.actions;

export default quizSlice.reducer;
