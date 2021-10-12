import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: {},
  createdRoom: false,
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
    createRoom(state, action) {
      state.isRoom = action.payload;
    },
    saveRoomId(state, action) {
      state.roomId = action.payload;
    },
    getBattle(state, action) {
      const roomId = action.payload;
      state.breakers = state.rooms[roomId];
    },
  },
});

export const { saveRoomData, createRoom, saveRoomId, getBattle } =
  battleSlice.actions;

export default battleSlice.reducer;
