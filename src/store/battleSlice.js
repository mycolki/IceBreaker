import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: {},
  createdRoom: false,
  roomId: '',
};

const battleSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveRoomData(state, action) {
      state.rooms = action.payload;
    },
    createRoom(state, action) {
      state.isRoom = action.payload;
    },
    saveRoomId(state, action) {
      state.roomId = action.payload;
    },
  },
});

export const { saveRoomData, createRoom, saveRoomId } = battleSlice.actions;

export default battleSlice.reducer;
