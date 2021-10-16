import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import { getDatabase, ref, onValue, update } from 'firebase/database';

import { showMessage, onError } from '../../store/quizSlice';
import { saveBattle } from '../../store/battleSlice';
import { ROUTE, ROOM } from '../../constants/game';
import { RESET } from '../../constants/messages';

import Button from '../share/Button';
import Message from '../share/Message';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';

function BattleOver() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const breakers = useSelector((state) => state.battle?.breakers);
  const name = useSelector((state) => state.battle?.name);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    onValue(ref(getDatabase(), `${ROOM}/${roomId}/breakers`), (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      dispatch(saveBattle(data));
    });

    if (breakers) {
      const sorted = _.sortBy(_.cloneDeep(breakers), 'score');

      if (sorted[0].score === sorted[1].score) return setIsDraw(true);

      sorted[1].isWinner = true;

      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        breakers: sorted,
      });
    }
  }, [dispatch, roomId]);

  return (
    <Container>
      <Result>
        {isDraw ? (
          <h1 className="result-title">DRAW</h1>
        ) : (
          <h1 className="result-title">
            {_.filter(breakers, { name, isWinner: true })
              ? 'YOU WIN'
              : 'YOU LOST'}
          </h1>
        )}
      </Result>
      <Scores>
        <div className="vs">vs</div>
        {breakers &&
          breakers.map((breaker) => (
            <ScoreBox isWinner={breaker.isWinner}>
              <div className="score">{breaker.score}</div>
              <div className="user-name">{breaker.name}</div>
            </ScoreBox>
          ))}
      </Scores>
      <Buttons>
        <li className="button">
          <Button text="공유하기" size="large" color="pink" />
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

export default BattleOver;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.winGameBg};
  background: ${({ theme }) => theme.loseGameBg};
  text-align: center;
`;

const Result = styled.div`
  height: 45%;
  position: relative;

  .result-title {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    font-size: 44px;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.white};
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepBlue};
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepPink};
  }
`;

const Scores = styled.div`
  ${flexCenter}
  height: 20%;

  .vs {
    position: absolute;
    font-size: 24px;
    color: ${({ theme }) => theme.white};
  }
`;

const ScoreBox = styled.div`
  width: 45%;
  font-family: 'Do hyeon';
  color: ${({ theme }) => theme.white};

  .score {
    height: 60px;
    font-size: 55px;
  }

  .user-name {
    font-family: 'Do hyeon';
    font-size: 22px;
  }
`;

const Buttons = styled.ul`
  ${flexCenterColumn}
  height: 30%;

  button {
    &:first-child {
      margin-bottom: 20px;
    }
  }
`;
