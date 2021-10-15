import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import { getDatabase, ref, onValue, update } from 'firebase/database';

import {
  showMessage,
  showAnswerBoxByInput,
  toggleAnswer,
  passNextLevel,
  onError,
} from '../../store/quizSlice';
import { saveName } from '../../store/battleSlice';
import { QUIZ_LENGTH, ROUTE, ROOM } from '../../constants/game';
import { RESET } from '../../constants/messages';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../share/Message';
import IcePlate from '../IcePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';
import Button from '../share/Button';

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

  const breakers = useSelector((state) => state.battle?.breakers);
  const name = useSelector((state) => state.battle?.name);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    try {
      const { userName } = JSON.parse(
        window.sessionStorage.getItem('userName'),
      );
      dispatch(saveName(userName));
    } catch (err) {
      dispatch(onError(err.message));
      history.push(ROUTE.ERROR);
    }

    return () => dispatch(showMessage(RESET));
  }, [dispatch]);

  useEffect(() => {
    onValue(ref(getDatabase(), `${ROOM}/${roomId}`), (snapshot) => {
      const data = snapshot.val();

      if (!data.isPlaying) {
        return history.push(`${ROUTE.BATTLE_OVER}/${roomId}`);
      }
    });
  }, [isGameOver]);

  const goToLastPage = () => {
    if (breakers) {
      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        isPlaying: false,
      });

      return setIsGameOver(true);
    }

    return history.push(ROUTE.GAME_OVER);
  };

  const goToNextLevel = () => {
    if (breakers) {
      const updatedLevel = _.cloneDeep(breakers).map((breaker) => {
        if (breaker.name === name) {
          breaker.level += 1;
        }

        return breaker;
      });

      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        breakers: updatedLevel,
      });
    }

    dispatch(toggleAnswer(false));
    dispatch(showAnswerBoxByInput(''));
    dispatch(passNextLevel());
  };

  return (
    <Container>
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
  background: ${({ theme }) => theme.breakingBg};
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
