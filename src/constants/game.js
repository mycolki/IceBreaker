export const QUIZ = 'quiz';
export const ROOMS = 'rooms';
export const RANKERS = 'rankers';
export const BREAKER_LENGTH = 2;
export const QUIZ_LENGTH = 7;
export const ROUTE = {
  MENU: '/',
  READY: '/ready',
  READY_ID: '/ready/:roomId',
  BREAKING: '/breaking',
  BREAKING_ID: '/breaking/:roomId',
  ROOMS: '/rooms',
  ROOM: '/room',
  ROOM_ID: '/room/:roomId',
  GAME_OVER: '/gameover',
  BATTLE_OVER_ID: '/battleover/:roomId',
  BATTLE_OVER: '/battleover',
  RANKING: '/ranking',
  ERROR: '/error',
};

export const SCORES = {
  Lv1: 20,
  Lv2: 30,
  Lv3: 40,
  Lv4: 50,
  Lv5: 60,
  Lv6: 70,
  Lv7: 230,
};

export const TIME_LIMIT_ANSWER = 15;
export const SECONDS_PER_LEVEL = {
  Lv1: 15,
  Lv2: 10,
  Lv3: 10,
  Lv4: 10,
  Lv5: 7,
  Lv6: 7,
  Lv7: 5,
};

export const MODAL_TITLE = {
  INPUT_HOST_NAME: '방에 참가할 닉네임을 입력해주세요',
  PASS_ROOM_ID: '친구에게 방ID를 전달해주세요😀',
};
