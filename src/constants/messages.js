export const VALIDATION_INPUT = {
  TYPE: 'validationInput',
  FILL_BLANK: {
    type: 'validationInput',
    text: '아무 것도 입력되지 않았습니다',
  },
  ONLY_KOREAN: {
    type: 'validationInput',
    text: '아이스브레이커 정답은 모두 한글입니다',
  },
};

export const VALIDATION_ANSWER = {
  TYPE: 'validationAnswer',
  ALL_WRONG: {
    type: 'validationAnswer',
    text: '단 한 글자도 맞지 않네요',
  },
};

export const GAME = {
  BREAK_ICE: {
    type: 'break',
    text: '자 얼음을 깰 시간이예요!',
  },
  START: {
    type: 'start',
    text: '얼음 속에 무엇이 들어있나요?',
  },
};
