import { useSelector } from 'react-redux';
import { Stage, Layer, RegularPolygon } from 'react-konva';

import styled from 'styled-components';
import theme from '../../styles/theme';

function Header() {
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const score = useSelector((state) => state.quiz?.score);

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
        <span className="second">30</span>
      </Time>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  height: 10%;
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
    color: ${({ theme }) => theme.red};
  }
`;
