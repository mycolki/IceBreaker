import { createSlice } from '@reduxjs/toolkit';

const name = 'quiz';
const initialState = {
  questions: [{ imgUrl: '', answer: '' }],
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    foo() {},
  },
});

export const { foo } = quizSlice.actions;
export default quizSlice.reducer;
