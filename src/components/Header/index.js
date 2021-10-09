import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';

import { toggleForm, toggleAnswer, showMessage } from '../../store/quizSlice';
import { GAME } from '../../constants/messages';

function Header() {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const score = useSelector((state) => state.quiz?.score);
  const isEnd = useSelector((state) => state.quiz?.isEnd);
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
        setSecond(i);
        await waitForOneSecond();
      }
    };

    (async () => {
      if (isEnd) {
        dispatch(toggleForm());
        document.querySelector('.second').classList.remove('answer');
        return clearTimeout(timer);
      }

      dispatch(showMessage(GAME.BREAK_ICE));
      await countToZero(4);
      dispatch(toggleForm());

      dispatch(showMessage(GAME.START));
      document.querySelector('.second').classList.add('answer');
      await waitForOneSecond();
      await countToZero(10);
      dispatch(toggleAnswer());
    })();

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isEnd]);

  return (
    <Wrapper>
      <StateBar>
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
      </StateBar>
      <Time>
        <span className="clock">⏰</span>
        <span className="second">{second < 10 ? `0${second}` : second}</span>
      </Time>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 9%;
`;

const StateBar = styled.div`
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
  }

  .answer {
    color: ${({ theme }) => theme.red};
  }
`;
