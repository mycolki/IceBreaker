import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, onValue, set, update } from 'firebase/database';
import { GiBearFace } from 'react-icons/gi';
import _ from 'lodash';

import { showMessage } from '../../store/quizSlice';
import { saveRoomData } from '../../store/battleSlice';
import { checkBreakerLength } from '../../utils/battle/checkBreakerLength';

import iceBear from '../../asset/iceBear.png';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { flexCenterColumn } from '../../styles/share/common';
import { ROUTE, ROOM, BREAKER_LENGTH } from '../../constants/game';
import { BATTLE, RESET } from '../../constants/messages';

import Message from '../share/Message';
import Button from '../share/Button';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { roomId } = useParams();
  const rooms = useSelector((state) => state.battle?.rooms);
  const [name, setName] = useState('');

  useEffect(() => {
    onValue(ref(getDatabase(), ROOM), (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      dispatch(saveRoomData(data));
    });

    if (
      rooms &&
      checkBreakerLength(rooms[roomId]?.breakers, 'name') === BREAKER_LENGTH
    ) {
      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        active: false,
      });
    }

    dispatch(showMessage(BATTLE.PLEASE_READY));
    const { userName } = JSON.parse(window.sessionStorage.getItem('userName'));
    setName(userName);

    return () => {
      dispatch(showMessage(RESET));
    };
  }, [dispatch, history, roomId]);

  useEffect(() => {
    if (rooms[roomId].isAllReady) {
      dispatch(showMessage(BATTLE.START));

      setTimeout(() => {
        history.push(`${ROUTE.READY}`);
      }, 3000);
    }
    // setTimeout(() => {
    //   history.push(`${ROUTE}/${roomId}`);
    // }, 3000);
  });

  const exitRoom = () => {
    if (checkBreakerLength(rooms[roomId].breakers, 'name') === 1) {
      set(ref(getDatabase(), `${ROOM}/${roomId}`), null);
      return history.push(ROUTE.ROOMS);
    }

    const breakers = [];
    const clone = _.cloneDeep([...rooms[roomId].breakers]);
    clone.forEach((breaker, i) => {
      if (breaker.name === name) {
        breaker.name = '';

        if (breaker === clone[0]) {
          const other = clone[1];
          [breakers[0], breakers[1]] = [other, breaker];
        }
      }

      breaker.isReady = false;
    });

    update(ref(getDatabase(), `${ROOM}/${roomId}`), {
      active: true,
      isAllReady: false,
      breakers,
    });

    history.push(ROUTE.ROOMS);
  };

  const readyBattle = () => {
    const readyLength = checkBreakerLength(
      [...rooms[roomId].breakers],
      'isReady',
    );

    if (readyLength === 1) {
      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        isAllReady: true,
      });
    }

    const clone = _.cloneDeep([...rooms[roomId].breakers]);
    const breakers = clone.map((breaker) => {
      if (breaker.name === name) {
        breaker.isReady = !breaker.isReady;
      }

      return breaker;
    });

    update(ref(getDatabase(), `${ROOM}/${roomId}`), {
      breakers,
    });
  };

  return (
    <Container>
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
      <RoomFooter isAllReady={rooms[roomId].isAllReady}>
        <Button
          text="READY"
          size="large"
          color="skyBlue"
          disabled={rooms[roomId].isAllReady}
          onClick={readyBattle}
        />
        <Button
          text="나가기"
          size="large"
          color="pink"
          disabled={rooms[roomId].isAllReady}
          onClick={exitRoom}
        />
      </RoomFooter>
    </Container>
  );
}

export default Room;

const BattleGround = styled.div`
  position: relative;
  height: 50%;
  padding-top: 20px;

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
    font-size: ${({ isUser }) => (isUser ? '26px' : '20px')};
    color: ${({ theme }) => theme.deepGray};
    -webkit-text-stroke: 1px ${({ theme }) => theme.deepGray};

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
    margin-bottom: 15px;
    pointer-events: ${({ isAllReady }) => (isAllReady ? 'none' : 'auto')};

    &:first-child {
      height: 55px;
      border-radius: 20px;
      font-size: 24px;
    }
  }
`;
