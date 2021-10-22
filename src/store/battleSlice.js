import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: null,
  roomId: '',
  breakers: null,
  name: '',
  id: '',
  opponentId: null,
  opponentLevel: 1,
  isAttacked: false,
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
    saveBreakers(state, action) {
      state.breakers = action.payload;
    },
    saveName(state, action) {
      state.name = action.payload;
    },
    saveId(state, action) {
      const { id, opponentId } = action.payload;
      state.opponentId = opponentId;
      state.id = id;
    },
    saveOpponentLevel(state, action) {
      state.opponentLevel = action.payload;
    },
    receiveAttack(state, action) {
      if (action.payload === true) {
        state.currentSecond -= 5;
      }

      state.isAttacked = action.payload;
    },
  },
});

export const {
  saveRoomData,
  saveRoomId,
  saveBreakers,
  saveName,
  saveId,
  saveOpponentLevel,
  receiveAttack,
} = battleSlice.actions;

export default battleSlice.reducer;
