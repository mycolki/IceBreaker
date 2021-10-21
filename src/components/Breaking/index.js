import { useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, onValue, update } from 'firebase/database';

import {
  showMessage,
  showAnswerBoxByInput,
  toggleAnswer,
  passNextLevel,
  activateBreaking,
} from '../../store/quizSlice';
import { detectWebp } from '../../utils/detectWebp';
import { QUIZ_LENGTH, ROUTE, ROOMS } from '../../constants/game';
import { RESET } from '../../constants/messages';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../share/Message';
import InputBox from '../InputBox';
import Footer from '../Footer';
import Button from '../share/Button';
import IcePlate from '../IcePlate';

function Breaking() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const userInput = useSelector((state) => state.quiz?.userInput);
  const isTimeOver = useSelector((state) => state.quiz?.isTimeOver);
  const isAnswer = userInput ? answer === userInput : null;

  useEffect(() => {
    return () => dispatch(showMessage(RESET));
  }, [dispatch]);

  useEffect(() => {
    if (!roomId) return;

    onValue(ref(getDatabase(), `${ROOMS}/${roomId}/isPlaying`), (snapshot) => {
      if (snapshot.val()) return;

      history.push(`${ROUTE.BATTLE_OVER}/${roomId}`);
    });
  }, [roomId]);

  const goToLastPage = () => {
    if (roomId) {
      return update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
        isPlaying: false,
      });
    }

    return history.push(ROUTE.GAME_OVER);
  };

  const goToNextLevel = () => {
    dispatch(toggleAnswer(false));
    dispatch(showAnswerBoxByInput(''));
    dispatch(passNextLevel());
    dispatch(activateBreaking(false));
  };

  return (
    <Container isWebp={detectWebp()}>
      <Header />
      <AnswerDisplayBox />
      {isTimeOver && (
        <Answer>
          <div className="result">
            <span className="result-text">{isAnswer ? '정답' : '얼음땡'}</span>
            <img
              className="img"
              src={imgUrl}
              alt={answer}
              width="130"
              height="130"
            />
            <Button
              text="NEXT"
              className="button"
              size="medium"
              color="lightPurple"
              onClick={level === QUIZ_LENGTH ? goToLastPage : goToNextLevel}
            />
          </div>
        </Answer>
      )}
      <Message />
      <IcePlate />
      <InputBox />
      <Footer />
    </Container>
  );
}

export default Breaking;

const Container = styled.div`
  height: 100%;

  background-image: ${({ isWebp }) =>
    isWebp
      ? 'url(/background/floatCubeBg.webp)'
      : 'url(/background/floatCubeBg.png)'};
`;

const Answer = styled.div`
  z-index: 199;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.deepGray}85`};

  .result {
    z-index: 199;
    position: absolute;
    top: 7%;
    left: 50%;
    text-align: center;
    color: ${({ theme }) => theme.white};
    transform: translate(-50%, 50%);

    .start-text {
      font-size: 45px;
    }

    .result-text {
      font-size: 50px;
    }

    .img {
      margin: 40px;
      box-shadow: ${({ theme }) => theme.boxShadow};
    }
  }
`;
