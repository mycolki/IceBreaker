import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  players: {},
};

const battleSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveRoomData(state, action) {
      state.players = action.payload;
    },
  },
});

export const { saveRoomData } = battleSlice.actions;

export default battleSlice.reducer;
