import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTE } from '../../constants/quiz';

import Button from '../share/Button';

function GameOver() {
  const score = useSelector((state) => state.quiz?.score);
  const isWin = score ? score === 500 : null;

  return (
    <Container isWin={isWin}>
      <TitleWrapper isWin={isWin}>
        <h1 className="app-title">{isWin ? 'YOU WON' : 'YOU LOST'}</h1>
      </TitleWrapper>
      <MenuButtons>
        <li className="button">
          <Button text="친구에게 공유하기" size="large" color="pink" />
        </li>
        <li className="button">
          <Button text="랭킹 등록" size="large" color="purple" />
        </li>
        <li className="button">
          <Link to={ROUTE.MENU}>
            <Button text="처음으로" size="large" color="skyBlue" />
          </Link>
        </li>
      </MenuButtons>
    </Container>
  );
}

export default GameOver;

const Container = styled.div`
  height: 100%;
  background: ${({ theme, isWin }) =>
    isWin ? theme.winGameBg : theme.loseGameBg}; ;
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 48%;
  text-align: center;

  .app-title {
    position: absolute;
    top: 75%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 2em;
    color: white;
    -webkit-text-stroke: 2px
      ${({ theme, isWinner }) => (isWinner ? theme.deepBlue : theme.deepPink)};
    transform: translate(-50%, -50%);
  }
`;

const MenuButtons = styled.ul`
  height: 52%;
  text-align: center;

  .button {
    margin-bottom: 0.7em;
  }
`;
