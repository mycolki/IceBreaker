import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: {},
  roomId: '',
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
  },
});

export const { saveRoomData, saveRoomId } = battleSlice.actions;

export default battleSlice.reducer;
