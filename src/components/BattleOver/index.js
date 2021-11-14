import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getDatabase, ref, set, get, child, update } from 'firebase/database';
import sortBy from 'lodash-es/sortBy';
import cloneDeep from 'lodash-es/cloneDeep';
import { GiBearFace } from 'react-icons/gi';
import styled from 'styled-components';
import useSound from 'use-sound';

import { changeMessage, resetQuizForGameOver } from '../../store/quizSlice';
import {
  saveBreakers,
  saveUserName,
  resetBattleForGameOver,
} from '../../store/battleSlice';
import { copyToClipboard } from '../../utils/copyToClipboard';

import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { ROUTE, ROOMS } from '../../constants/game';
import { GAME } from '../../constants/messages';
import { ERROR } from '../../constants/error';

import Button from '../share/Button';
import Message from '../share/Message';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

function BattleOver() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const breakers = useSelector((state) => state.battle.breakers);
  const userName = useSelector((state) => state.battle.userName);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [play] = useSound('/audio/click.mp3');

  useEffect(() => {
    return () => {
      window.sessionStorage.removeItem('userName');
      dispatch(resetQuizForGameOver());
      dispatch(resetBattleForGameOver());
    };
  }, [dispatch]);

  useEffect(() => {
    try {
      const { userName } = JSON.parse(
        window.sessionStorage.getItem('userName'),
      );

      dispatch(saveUserName(userName));
    } catch (err) {
      history.push(ROUTE.ERROR, {
        error: ERROR.LOAD_DATA,
      });
    }
  }, [dispatch, history]);

  useEffect(() => {
    const getBreakers = async () => {
      try {
        const finalBreakers = (
          await get(child(ref(getDatabase()), `${ROOMS}/${roomId}/breakers`))
        ).val();

        const sorted = sortBy(cloneDeep(finalBreakers, 'score'));

        if (sorted[0].score === sorted[1].score) {
          setIsDraw(true);
        } else if (sorted[1].name === userName) {
          setIsWinner(true);
          sorted[1].isWinner = true;
        }

        dispatch(saveBreakers(sorted));
        setLoading(true);

        update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
          breakers: sorted,
        });
      } catch (err) {
        history.push(ROUTE.ERROR, {
          error: ERROR.LOAD_DATA,
        });
      }
    };

    getBreakers();
  }, [dispatch, history, roomId, userName]);

  const shareGameURL = () => {
    play();
    copyToClipboard(process.env.REACT_APP_ICE_BREAKER_URL);
    dispatch(changeMessage(GAME.SHARE));
  };

  const goToMenu = () => {
    play();
    set(ref(getDatabase(), `${ROOMS}/${roomId}`), null);
    history.push(ROUTE.MENU);
  };

  return (
    <Container isWinner={isWinner} isDraw={isDraw}>
      <Result isWinner={isWinner} isDraw={isDraw}>
        {loading ? (
          <>
            {isDraw ? (
              <h1 className="result-title">DRAW</h1>
            ) : (
              <h1 className="result-title">
                {isWinner ? 'YOU WIN' : 'YOU LOST'}
              </h1>
            )}
          </>
        ) : (
          <BarSpinner color="purple" />
        )}
      </Result>
      <Scores>
        <div className="vs">vs</div>
        {breakers.length !== 0
          ? breakers.map((breaker, i) => (
              <ScoreBox
                key={breaker.name + i}
                isWinner={breaker.isWinner}
                isUser={breaker.name === userName}
              >
                {breaker.name === userName && (
                  <GiBearFace className="user-icon" />
                )}
                {loading ? (
                  <>
                    <div className="score">{breaker.score}</div>
                    <div className="user-name">{breaker.name}</div>
                  </>
                ) : (
                  <BarSpinner color="purple" />
                )}
              </ScoreBox>
            ))
          : null}
      </Scores>
      <Buttons>
        <li className="button">
          <Button
            text="공유하기"
            size="large"
            backgroundColor="pink"
            onClick={shareGameURL}
          />
        </li>
        <li className="button">
          <Link to={ROUTE.MENU}>
            <Button
              text="처음으로"
              size="large"
              backgroundColor="skyBlue"
              onClick={goToMenu}
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
  background: ${({ isDraw }) => isDraw && 'url(/background/draw.webp)'};
  background: ${({ isWinner }) =>
    isWinner ? 'url(/background/won.webp)' : 'url(/background/lost.webp)'};
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
