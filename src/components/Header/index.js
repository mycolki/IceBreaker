import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';

import { getDatabase, ref, onValue, update } from 'firebase/database';
import {
  showForm,
  showResult,
  showMessage,
  rememberSecond,
  countAgain,
  onError,
} from '../../store/quizSlice';
import { saveOpponentLevel, saveId } from '../../store/battleSlice';
import { pounding } from '../../styles/share/animation';
import {
  ROUTE,
  ROOMS,
  SECONDS_PER_LEVEL,
  TIME_LIMIT_ANSWER,
} from '../../constants/game';
import { ERROR } from '../../constants/error';
import { ANSWER, BREAK } from '../../constants/messages';
import { flexCenter } from '../../styles/share/common';
import { emergency } from '../../styles/share/animation';

function Header() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const score = useSelector((state) => state.quiz?.score);
  const isImgLoaded = useSelector((state) => state.quiz?.isImgLoaded);
  const isAnswerTime = useSelector((state) => state.quiz?.isAnswerTime);
  const isTimeOver = useSelector((state) => state.quiz?.isTimeOver);
  const isOpenedHint = useSelector((state) => state.quiz?.isOpenedHint);
  const isClosedHint = useSelector((state) => state.quiz?.isClosedHint);
  const currentSecond = useSelector((state) => state.quiz?.currentSecond);

  const name = useSelector((state) => state.battle?.name);
  const id = useSelector((state) => state.battle?.id);
  const opponentId = useSelector((state) => state.battle?.opponentId);
  const opponentLevel = useSelector((state) => state.battle?.opponentLevel);

  const TIME_LIMIT_BREAK = SECONDS_PER_LEVEL[`Lv${level}`];
  const [second, setSecond] = useState(TIME_LIMIT_BREAK);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (typeof opponentId !== 'number') return;

    onValue(
      ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${opponentId}/level`),
      (snapshot) => {
        const level = snapshot.val();

        if (level === 1) return;

        dispatch(saveOpponentLevel(level));

        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
      },
    );

    return () => {
      dispatch(saveOpponentLevel(1));
      dispatch(
        saveId({
          id: null,
          opponentId: null,
        }),
      );
    };
  }, [opponentId]);

  useEffect(() => {
    if (!name || !level) return;

    update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${id}`), {
      level,
    });
  }, [level]);

  useEffect(() => {
    if (!name || !score) return;

    update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${id}`), {
      score,
    });
  }, [score]);

  useEffect(() => {
    if (!level) return;

    let timer;
    const waitForOneSecond = () => {
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(), 1000);
      });
    };

    const countToZero = async (from) => {
      for (let i = from; i >= 0; i--) {
        setSecond(i);
        await waitForOneSecond();
      }
    };

    const countBreaking = async () => {
      dispatch(showMessage(BREAK[`Lv${level}`]));
      await countToZero(TIME_LIMIT_BREAK);
      dispatch(showMessage(ANSWER[`Lv${level}`]));
      dispatch(showForm(true));
    };

    const countAnswerTime = async () => {
      await waitForOneSecond();
      await countToZero(currentSecond ? currentSecond : TIME_LIMIT_ANSWER);
      dispatch(showResult(true));
    };

    (async () => {
      if (!isImgLoaded) return;

      if (isTimeOver) {
        dispatch(showForm(false));
        return clearTimeout(timer);
      }

      if (isOpenedHint) {
        dispatch(rememberSecond(second));
        return clearTimeout(timer);
      }

      if (isClosedHint) {
        await countAnswerTime();
        dispatch(rememberSecond(0));
        return dispatch(countAgain(false));
      }

      try {
        await countBreaking();
        await countAnswerTime();
      } catch (err) {
        dispatch(onError(ERROR.UNKNOWN));
        history.push(ROUTE.ERROR);
      }
    })();

    return () => clearTimeout(timer);
  }, [
    dispatch,
    level,
    isTimeOver,
    isImgLoaded,
    history,
    TIME_LIMIT_BREAK,
    isOpenedHint,
    isClosedHint,
  ]);

  return (
    <Container>
      {showWarning && (
        <BattleMessage>상대 브레이커 레벨 {opponentLevel} 진입!</BattleMessage>
      )}
      <StateBox>
        <Stage width={100} height={64}>
          <Layer>
            <RegularPolygon
              x={40}
              y={30}
              sides={6}
              radius={24}
              rotation={90}
              fill={theme.pink}
            />
          </Layer>
        </Stage>
        <UserScore>
          <span className="level">Lv.{level}</span>
          <span className="score">{score === 0 ? `00` : score}</span>
        </UserScore>
      </StateBox>
      <Time>
        <span className="clock">⏰</span>
        <span className={isAnswerTime ? 'second' : 'breaking second'}>
          {second < 10 ? `0${second}` : second}
        </span>
      </Time>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 9%;
`;

const StateBox = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
`;

const UserScore = styled.div`
  transform: translate(-85px, 0px);
  text-align: center;

  .level {
    display: block;
    font-size: 0.7em;
    color: ${({ theme }) => theme.white};
  }

  .score {
    padding-left: 1px;
    font-size: 1.7em;
    -webkit-text-stroke: 1px ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.deepBlue};
  }
`;

const Time = styled.div`
  width: 25%;

  .clock {
    font-size: 1.5em;
    margin-right: 5px;
  }

  .second {
    position: absolute;
    font-size: 1.7em;
    color: ${({ theme }) => theme.purple};
    animation: ${pounding} 1.1s infinite linear;
  }

  .second.breaking {
    color: ${({ theme }) => theme.red};
  }

  .answer {
    color: ${({ theme }) => theme.red};
  }
`;

const BattleMessage = styled.div`
  ${flexCenter}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: 'Do Hyeon';
  color: ${({ theme }) => theme.deepPink};
  animation: ${emergency} 1s infinite;
`;
