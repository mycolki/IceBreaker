import { createSlice } from '@reduxjs/toolkit';

const name = 'quiz';
const initialState = {
  questions: {},
  allIds: [],
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    getDataByFirebase(state, action) {
      for (const [key, val] of Object.entries(action.payload)) {
        if (state.questions[key]) return;

        state.allIds.push(key);
        state.questions[key] = val;
      }
    },
  },
});

export const { getDataByFirebase } = quizSlice.actions;
export default quizSlice.reducer;
