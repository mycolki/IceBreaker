import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: null,
  roomId: '',
  breakers: null,
  name: '',
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
    saveName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { saveRoomData, saveRoomId, saveBattle, saveName } =
  battleSlice.actions;

export default battleSlice.reducer;
