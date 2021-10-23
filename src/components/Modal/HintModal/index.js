import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, update } from 'firebase/database';
import { takeHint, showMessage } from '../../../store/quizSlice';
import hintCokeWeb from '../../../asset/hintCoke.webp';
import hintCoke from '../../../asset/hintCoke.png';
import { rightAndLeft } from '../../../styles/share/animation';
import { flexCenter } from '../../../styles/share/common';
import { ROOMS } from '../../../constants/game';
import { HINT, RESET } from '../../../constants/messages';

import ImgWithFallback from '../../ImgWithFallback';
import Message from '../../share/Message';

function HintModal({ onClose }) {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const opponentId = useSelector((state) => state.battle?.opponentId);
  const hints = useSelector((state) => state.quiz?.hints);

  useEffect(() => {
    dispatch(showMessage(HINT.GUIDE));

    return () => dispatch(showMessage(RESET));
  }, []);

  const attackOpponent = () => {
    update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${opponentId}`), {
      isAttacked: true,
    });
  };

  const useHint2Coke = () => {
    if (hints < 2) {
      return dispatch(showMessage(HINT.NOPE));
    }

    attackOpponent();
    dispatch(takeHint(2));
    onClose();
  };

  const useHint1Coke = () => {
    if (hints === 0) {
      return dispatch(showMessage(HINT.NOPE));
    }

    dispatch(takeHint(1));
    onClose();
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Hint>
        <div className="cokes">
          <ImgWithFallback
            src={hintCokeWeb}
            fallback={hintCoke}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useHint1Coke}
          />
        </div>
        <span className="hint-comment">정답 맞추는 시간 +10초</span>
      </Hint>
      <Hint>
        <div className="cokes">
          <ImgWithFallback
            src={hintCokeWeb}
            fallback={hintCoke}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useHint2Coke}
          />
          <ImgWithFallback
            src={hintCokeWeb}
            fallback={hintCoke}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useHint2Coke}
          />
        </div>
        <span className="hint-comment">상대브레이커 시간 -5초</span>
      </Hint>
    </Container>
  );
}

export default HintModal;

const Container = styled.div`
  height: 100%;
  padding-bottom: 5px;
  font-family: 'Do Hyeon';
  text-align: center;
`;

const MessageArea = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 26%;

  .message {
    width: 80%;
    height: 30px;
    margin: auto;
    font-size: 17px;
    line-height: 30px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.deepGray};
    color: ${({ theme }) => theme.white};
  }
`;

const Hint = styled.div`
  ${flexCenter}
  height: 37%;
  padding: 0 15px;

  .cokes {
    ${flexCenter}
    display: flex;
    text-align: center;
    width: 40%;

    img {
      transform: rotate(20deg);
      animation: ${rightAndLeft} 1.1s infinite ease-in;
    }
  }

  .hint-comment {
    width: 60%;
    font-size: 18px;
    color: ${({ theme }) => theme.deepGray};
  }
`;
