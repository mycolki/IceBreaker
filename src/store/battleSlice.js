import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: null,
  roomId: '',
  breakers: null,
};

const battleSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveRoomData(state, action) {
      state.rooms = action.payload;
    },
    saveRoomId(state, action) {
      state.roomId = action.payload;
    },
    saveBattle(state, action) {
      state.breakers = action.payload;
    },
  },
});

export const { saveRoomData, saveRoomId, saveBattle } = battleSlice.actions;

export default battleSlice.reducer;
