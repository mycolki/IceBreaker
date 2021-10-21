import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { sortBy, cloneDeep } from 'lodash';

import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import { GiBearFace } from 'react-icons/gi';

import { onError } from '../../store/quizSlice';
import { saveBreakers, saveName } from '../../store/battleSlice';
import { detectWebp } from '../../utils/detectWebp';

import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { ROUTE, ROOMS } from '../../constants/game';
import { ERROR } from '../../constants/error';

import Button from '../share/Button';
import Message from '../share/Message';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

function BattleOver() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const breakers = useSelector((state) => state.battle?.breakers);
  const name = useSelector((state) => state.battle?.name);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const { userName } = JSON.parse(
        window.sessionStorage.getItem('userName'),
      );
      dispatch(saveName(userName));
    } catch (err) {
      dispatch(onError(ERROR.LOAD_DATA));
      history.push(ROUTE.ERROR);
    }
  }, [dispatch]);

  useEffect(() => {
    const getBreakers = async () => {
      try {
        const snapshot = await get(
          child(ref(getDatabase()), `${ROOMS}/${roomId}/breakers`),
        );

        const sorted = sortBy(cloneDeep(snapshot.val()), 'score');

        if (sorted[0].score === sorted[1].score) return setIsDraw(true);

        sorted[1].isWinner = true;

        if (sorted[1].name === name) setIsWinner(true);

        dispatch(saveBreakers(sorted));
        setLoading(true);

        update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
          breakers: sorted,
        });
      } catch (err) {
        dispatch(onError(ERROR.LOAD_DATA));
        history.push(ROUTE.ERROR);
      }
    };

    getBreakers();
  }, [dispatch, roomId, name]);

  const goToMenu = () => {
    set(ref(getDatabase(), `${ROOMS}/${roomId}`), null);
    history.push(ROUTE.MENU);
  };

  return (
    <Container isWinner={isWinner} isDraw={isDraw} isWebp={detectWebp()}>
      {loading ? (
        <>
          <Result isWinner={isWinner} isDraw={isDraw}>
            {isDraw ? (
              <h1 className="result-title">DRAW</h1>
            ) : (
              <h1 className="result-title">
                {isWinner ? 'YOU WIN' : 'YOU LOST'}
              </h1>
            )}
          </Result>
          <Scores>
            <div className="vs">vs</div>
            {breakers &&
              breakers.map((breaker, i) => (
                <ScoreBox
                  key={breaker.name + i}
                  isWinner={breaker.isWinner}
                  isUser={breaker.name === name}
                >
                  {breaker.name === name && (
                    <GiBearFace className="user-icon" />
                  )}
                  <div className="score">{breaker.score}</div>
                  <div className="user-name">{breaker.name}</div>
                </ScoreBox>
              ))}
          </Scores>
        </>
      ) : (
        <BarSpinner />
      )}
      <Buttons>
        <li className="button">
          <Button text="공유하기" size="large" color="pink" />
        </li>
        <li className="button">
          <Link to={ROUTE.MENU}>
            <Button
              text="처음으로"
              size="large"
              color="skyBlue"
              onCick={goToMenu}
            />
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
  text-align: center;
  background: ${({ isDraw, isWebp }) =>
    isDraw && isWebp && 'url(/background/draw.webp)'};
  background: ${({ isDraw, isWebp }) =>
    isDraw && !isWebp && 'url(/background/draw.png)'};
  background: ${({ isWinner, isWebp }) =>
    isWinner && isWebp && 'url(/background/won.webp)'};
  background: ${({ isWinner, isWebp }) =>
    isWinner && !isWebp && 'url(/background/won.png)'};
  background: ${({ isWinner, isWebp }) =>
    !isWinner && isWebp && 'url(/background/lost.webp)'};
  background: ${({ isWinner, isWebp }) =>
    !isWinner && !isWebp && 'url(/background/lost.png)'};
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
    -webkit-text-stroke: 2px ${({ theme, isDraw }) => isDraw && theme.green};
    -webkit-text-stroke: 2px
      ${({ isWinner, theme }) => (isWinner ? theme.deepBlue : theme.deepPink)};
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
  ${flexCenterColumn}
  position: relative;
  width: 50%;
  font-family: 'Do hyeon';
  color: ${({ theme, isUser }) => (isUser ? theme.white : theme.deepBlue)};

  .score {
    height: 75px;
    font-size: ${({ isUser }) => (isUser ? '75px' : '55px')};
    line-height: ${({ isUser }) => (isUser ? '75px' : '80px')};
  }

  .user-name {
    height: 30px;
    font-family: 'Do hyeon';
    font-size: ${({ isWinner }) => (isWinner ? '30px' : '24px')};
    line-height: ${({ isWinner }) => (isWinner ? '30px' : '37px')};
  }

  .user-icon {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    padding: 2px;
    border-radius: 10px;
    font-size: 22px;
    background-color: ${({ theme }) => theme.deepGray};
    transform: translate(40px, -14px);
    color: ${({ theme }) => theme.white};
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
