import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: {},
  createdRoom: false,
  roomId: '',
  isCheckedRoom: false,
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
    checkRoom(state, action) {
      state.isCheckedRoom = action.payload;
    },
  },
});

export const { saveRoomData, createRoom, saveRoomId, checkRoom } =
  battleSlice.actions;

export default battleSlice.reducer;
