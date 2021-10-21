import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { resetScore } from '../../store/quizSlice';
import { detectWebp } from '../../utils/detectWebp';
import { ROUTE } from '../../constants/game';

import Button from '../share/Button';
import Message from '../share/Message';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

function GameOver() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz?.score);
  const isWin = score ? score === 500 : null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (score && isWin) setLoading(false);

    return () => dispatch(resetScore());
  }, [score, isWin]);

  return (
    <Container isWin={isWin} isWebp={detectWebp()}>
      {loading ? (
        <TitleWrapper isWin={isWin}>
          <h1 className="score">{score}</h1>
        </TitleWrapper>
      ) : (
        <BarSpinner />
      )}
      <Buttons>
        <li className="button">
          <Button text="공유하기" size="large" color="pink" />
        </li>
        <li className="button">
          <Button text="랭킹 등록" size="large" color="purple" />
        </li>
        <li className="button">
          <Link to={ROUTE.MENU}>
            <Button text="처음으로" size="large" color="skyBlue" />
          </Link>
        </li>
      </Buttons>
      <Message />
    </Container>
  );
}

export default GameOver;

const Container = styled.div`
  height: 100%;
  background-image: ${({ isWebp }) =>
    isWebp ? 'url(/background/solo.webp)' : 'url(/background/solo.png)'};
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 65%;
  text-align: center;

  .score {
    position: absolute;
    top: 75%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 60px;
    color: white;
    -webkit-text-stroke: 2px ${({ theme }) => theme.orange};
    transform: translate(-50%, -50%);
  }
`;

const Buttons = styled.ul`
  height: 30%;
  text-align: center;

  .button {
    margin-bottom: 0.7em;
  }
`;
