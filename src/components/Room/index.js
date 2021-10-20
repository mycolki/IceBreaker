import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { cloneDeep, filter } from 'lodash';

import { getDatabase, ref, onValue, set, update } from 'firebase/database';
import { GiBearFace } from 'react-icons/gi';

import { showMessage, onError } from '../../store/quizSlice';
import { saveRoomData, saveName } from '../../store/battleSlice';
import { detectWebp } from '../../utils/detectWebp';

import iceBear from '../../asset/iceBear.png';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { flexCenterColumn } from '../../styles/share/common';
import { ROUTE, ROOMS, BREAKER_LENGTH } from '../../constants/game';
import { ERROR } from '../../constants/error';
import { BATTLE, RESET } from '../../constants/messages';

import Message from '../share/Message';
import Button from '../share/Button';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();
  const rooms = useSelector((state) => state.battle?.rooms);
  const name = useSelector((state) => state.battle?.name);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onValue(ref(getDatabase(), ROOMS), (snapshot) => {
      const rooms = snapshot.val();

      if (rooms) {
        dispatch(saveRoomData(rooms));
        setLoading(true);
      }
    });

    dispatch(showMessage(BATTLE.PLEASE_READY));
    try {
      const { userName } = JSON.parse(
        window.sessionStorage.getItem('userName'),
      );

      dispatch(saveName(userName));
    } catch (err) {
      dispatch(onError(ERROR.LOAD_DATA));
      history.push(ROUTE.ERROR);
    }

    return () => dispatch(showMessage(RESET));
  }, [dispatch]);

  useEffect(() => {
    if (!rooms) return;

    const breakerLength = filter(rooms[roomId].breakers, 'name').length;

    if (breakerLength === BREAKER_LENGTH) {
      update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
        active: false,
      });
    }

    for (const breaker of rooms[roomId].breakers) {
      if (breaker.name === name && breaker.isReady) {
        return setIsReady(true);
      }
    }
  }, [rooms]);

  useEffect(() => {
    let timer;

    if (!rooms) return;

    if (rooms[roomId].isAllReady) {
      dispatch(showMessage(BATTLE.START));
      timer = setTimeout(() => {
        history.push(`${ROUTE.READY}/${roomId}`);
      }, 3000);
    }

    return () => clearTimeout(timer);
  });

  const exitRoom = () => {
    if (!rooms) return;

    const breakerLength = filter(rooms[roomId].breakers, 'name').length;

    if (breakerLength === 1) {
      set(ref(getDatabase(), `${ROOMS}/${roomId}`), null);
      return history.push(ROUTE.ROOMS);
    }

    const clone = cloneDeep([...rooms[roomId].breakers]);

    if (clone[0].name === name) {
      [clone[0], clone[1]] = [clone[1], clone[0]];
    }

    const breakers = clone.map((breaker) => {
      breaker.isReady = false;

      if (breaker.name === name) {
        breaker.name = '';
      }

      return breaker;
    });

    update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
      active: true,
      isAllReady: false,
      breakers,
    });

    history.push(ROUTE.ROOMS);
  };

  const readyBattle = async () => {
    const clone = cloneDeep([...rooms[roomId].breakers]);
    const breakers = clone.map((breaker) => {
      if (breaker.name === name) {
        breaker.isReady = !breaker.isReady;
        setIsReady(false);
      }

      return breaker;
    });

    update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
      breakers,
    });

    const readyLength = filter(breakers, 'isReady').length;

    if (readyLength === BREAKER_LENGTH) {
      update(ref(getDatabase(), `${ROOMS}/${roomId}`), {
        isAllReady: true,
      });
    }
  };

  return (
    <Container isWebp={detectWebp()}>
      <RoomHeader>
        <h1 className="title">
          BREAKER <br />
          BATTLE
        </h1>
      </RoomHeader>
      <Message />
      <BattleGround>
        <div className="vs">VS</div>
        {rooms
          ? rooms[roomId].breakers.map((breaker, i) => (
              <Breaker
                key={breaker.name + i}
                isReady={breaker.isReady}
                isUser={breaker.name === name}
              >
                <span className="name">
                  {breaker.name ? breaker.name : ''}
                  {breaker.name === name && (
                    <GiBearFace className="user-icon" />
                  )}
                </span>
                <img src={iceBear} alt="bear" width="160" height="auto" />
                <span className="ready">{breaker.isReady ? 'READY' : ' '}</span>
              </Breaker>
            ))
          : null}
      </BattleGround>
      <RoomFooter isAllReady={rooms && rooms[roomId].isAllReady}>
        <Button
          text="READY"
          size="medium"
          color="purple"
          disabled={rooms && rooms[roomId].isAllReady}
          onClick={readyBattle}
        />
        <Button
          text="나가기"
          size="medium"
          color="pink"
          disabled={rooms && (isReady || rooms[roomId].isAllReady)}
          onClick={exitRoom}
        />
      </RoomFooter>
      {!loading ? <BarSpinner /> : null}
    </Container>
  );
}

export default Room;

const BattleGround = styled.div`
  position: relative;
  height: 50%;
  padding-top: 22px;

  .vs {
    position: absolute;
    top: 58%;
    left: 49%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: ${({ theme }) => theme.skyBlue};
  }
`;

const Breaker = styled.div`
  width: 50%;

  .name {
    position: relative;
    display: block;
    font-family: 'Do hyeon';
    font-size: ${({ isUser }) => (isUser ? '27px' : '20px')};
    color: ${({ theme, isUser }) => (isUser ? theme.white : theme.deepGray)};
    -webkit-text-stroke: 1px
      ${({ theme, isUser }) => (isUser ? theme.white : theme.deepGray)};

    &:last-child {
      display: block;
    }

    .user-icon {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      padding: 2px;
      border-radius: 10px;
      font-size: 22px;
      background-color: ${({ theme }) => theme.deepPink};
      transform: translate(40px, -14px);
      color: ${({ theme }) => theme.white};
    }
  }

  .ready {
    display: block;
    min-height: 24px;
    font-size: ${({ isUser }) => (isUser ? '24px' : '20px')};
    color: ${({ theme, isReady }) => (isReady ? theme.deepBlue : theme.white)};
    -webkit-text-stroke: ${({ theme, isReady }) =>
      isReady ? `1px ${theme.white}` : 'none'};
  }

  &:first-child {
    margin-right: 50%;
  }

  &:last-child {
    margin-left: 50%;
  }
`;

const RoomFooter = styled.div`
  ${flexCenterColumn}
  height: 25%;

  button {
    font-family: 'Do hyeon';
    pointer-events: ${({ isAllReady }) => (isAllReady ? 'none' : 'auto')};

    &:first-child {
      height: 60px;
      margin-bottom: 10px;
      font-size: 31px;
      -webkit-text-stroke: 1px ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.white};
    }

    &:last-child {
      height: 45px;
      font-size: 20px;
      color: ${({ theme }) => theme.white};
      animation: none;
    }
  }
`;
