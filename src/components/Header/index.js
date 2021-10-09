import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';

import {
  toggleForm,
  toggleAnswerResult,
  showMessage,
} from '../../store/quizSlice';
import { GAME } from '../../constants/messages';

function Header() {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const score = useSelector((state) => state.quiz?.score);
  const isEnding = useSelector((state) => state.quiz?.isEnding);
  const [second, setSecond] = useState(4);

  useEffect(() => {
    let timer;
    const waitForOneSecond = () => {
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(), 1000);
      });
    };

    const countToZero = async (from) => {
      for (let i = from; i >= 0; i--) {
        await waitForOneSecond();
        setSecond(i);
      }
    };

    (async () => {
      if (isEnding) {
        return clearTimeout(timer);
      }

      dispatch(showMessage(GAME.BREAK_ICE));
      await countToZero(3);
      dispatch(toggleForm());

      dispatch(showMessage(GAME.START));
      document.querySelector('.second').classList.add('answer');
      await countToZero(10);
      await waitForOneSecond();
      dispatch(toggleForm());
      dispatch(toggleAnswerResult());
    })();

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isEnding]);

  return (
    <Wrapper>
      <Stage width={100} height={60}>
        <Layer>
          <RegularPolygon
            x={40}
            y={31}
            sides={6}
            radius={26}
            rotation={90}
            fill={theme.pink}
          />
        </Layer>
      </Stage>
      <Score>
        <span className="level">Lv.{level}</span>
        <span className="score">{score}</span>
      </Score>
      <Time>
        <span className="clock">⏰</span>
        <span className="second">{second < 10 ? `0${second}` : second}</span>
      </Time>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  height: 9%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

const Score = styled.div`
  text-align: center;
  transform: translate(-153px, 3px);

  .level {
    display: block;
    font-size: 0.7em;
    color: ${({ theme }) => theme.white};
  }

  .score {
    font-size: 1.6em;
    -webkit-text-stroke: 1px ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.deepBlue};
  }
`;

const Time = styled.div`
  display: flex;

  .clock {
    font-size: 1.5em;
    margin-right: 5px;
  }

  .second {
    font-size: 1.7em;
    color: ${({ theme }) => theme.purple};
  }

  .answer {
    color: ${({ theme }) => theme.red};
  }
`;
