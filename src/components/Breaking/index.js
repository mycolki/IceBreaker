import { useState, useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import styled from 'styled-components';

import {
  changeGameStatus,
  decreaseTime,
  goToNextStep,
  endGame,
} from '../../store/quizSlice';
import { ROUTE, ROOMS, GAME_STATUS, QUIZ_LENGTH } from '../../constants/game';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Footer from '../Footer';
import Button from '../share/Button';
import IcePlate from '../IcePlate';
const Message = lazy(() => import('../share/Message'));
const InputBox = lazy(() => import('../InputBox'));

function Breaking() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const quizCollection = useSelector((state) => state.quiz.quizCollection);
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const currentQuizId = quizCollection.allIds[currentQuizIndex];
  const currentQuiz = quizCollection.byId[currentQuizId];
  const gameStatus = useSelector((state) => state.quiz.gameStatus);
  const remainingTime = useSelector((state) => state.quiz.remainingTime);
  const isGamePaused = useSelector((state) => state.quiz.isGamePaused);
  const userInput = useSelector((state) => state.quiz.userInput);
  const { answer, imgUrl } = currentQuiz;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    typeof Audio !== 'undefined' &&
      new Audio(
        'https://icebreakerquiz.s3.ap-northeast-2.amazonaws.com/audio/breaking.mp3',
      ),
  );

  useEffect(() => {
    let timer;

    if (isGamePaused) return;

    if (gameStatus === GAME_STATUS.ICE_BREAKING_TIME && remainingTime === 0) {
      return dispatch(changeGameStatus(GAME_STATUS.ANSWER_GUESS_TIME));
    }

    if (gameStatus === GAME_STATUS.ANSWER_GUESS_TIME && remainingTime === 0) {
      return dispatch(changeGameStatus(GAME_STATUS.RESULT_DISPLAY_TIME));
    }

    if (
      gameStatus === GAME_STATUS.ICE_BREAKING_TIME ||
      gameStatus === GAME_STATUS.ANSWER_GUESS_TIME
    ) {
      timer = setTimeout(() => dispatch(decreaseTime()), 1000);
    }

    return () => clearTimeout(timer);
  }, [dispatch, gameStatus, remainingTime, isGamePaused]);

  useEffect(() => {
    if (!roomId) return;

    onValue(ref(getDatabase(), `${ROOMS}/${roomId}/onBattle`), (snapshot) => {
      if (!snapshot.val()) {
        dispatch(endGame());
        history.push(`${ROUTE.BATTLE_OVER}/${roomId}`);
      }
    });
  }, [history, roomId]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
      audio.loop = true;
    }
  }, [isPlaying]);

  useEffect(() => {
    setIsPlaying(true);

    return () => audio.pause();
  }, []);

  const goToNextQuiz = () => dispatch(goToNextStep());
  const goToEnding = () => {
    dispatch(endGame());

    if (roomId) {
      update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
        onBattle: false,
      });
    } else {
      history.push(ROUTE.GAME_OVER);
    }
  };

  return (
    <Container>
      <Header />
      <AnswerDisplayBox />
      {gameStatus === GAME_STATUS.RESULT_DISPLAY_TIME && (
        <Answer>
          <div className="result">
            <span className="result-text">
              {answer === userInput ? '정답' : '얼음땡'}
            </span>
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
              backgroundColor="lightPurple"
              onClick={
                currentQuizIndex + 1 === QUIZ_LENGTH ? goToEnding : goToNextQuiz
              }
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
  background-image: url(/background/floatCubeBg.webp);
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
