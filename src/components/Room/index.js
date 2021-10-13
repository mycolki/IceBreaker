import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

import { getDatabase, ref, onValue, set, update } from 'firebase/database';
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
      checkBreakerLength(rooms[roomId]?.breakers) === BREAKER_LENGTH
    ) {
      update(ref(getDatabase(), `${ROOM}/${roomId}`), {
        active: false,
      });
    }

    dispatch(showMessage(BATTLE.PLEASE_READY));
    const { userName } = JSON.parse(window.sessionStorage.getItem('userName'));
    setName(userName);

    return () => dispatch(showMessage(RESET));
  }, [dispatch, history, roomId]);

  const exitRoom = () => {
    if (checkBreakerLength(rooms[roomId].breakers) === 1) {
      set(ref(getDatabase(), `${ROOM}/${roomId}`), null);
      return history.push(ROUTE.ROOMS);
    }

    const cloneBreakers = _.cloneDeep([...rooms[roomId].breakers]);
    const breakers = [];
    cloneBreakers.forEach((breaker) => {
      if (breaker.name === name) {
        breaker.name = '';
        breakers[1] = breaker;
      } else {
        breakers[0] = breaker;
      }
    });

    update(ref(getDatabase(), `${ROOM}/${roomId}`), {
      active: true,
      breakers,
    });

    history.push(ROUTE.ROOMS);
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
              <Breaker key={breaker.name + i}>
                <span className="name">{breaker.name ? breaker.name : ''}</span>
                <img src={iceBear} alt="bear" width="160" height="auto" />
                <span className="ready">READY</span>
              </Breaker>
            ))
          : null}
      </BattleGround>
      <RoomFooter>
        <Button text="READY" size="large" color="skyBlue" />
        <Button text="나가기" size="large" color="pink" onClick={exitRoom} />
      </RoomFooter>
    </Container>
  );
}

export default Room;

const BattleGround = styled.div`
  position: relative;
  height: 50%;
  padding-top: 30px;

  .vs {
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: ${({ theme }) => theme.skyBlue};
  }
`;

const Breaker = styled.div`
  width: 50%;

  .name {
    display: block;
    font-family: 'Do hyeon';
    font-size: 20px;
    color: ${({ theme }) => theme.deepGray};
  }

  .ready {
    display: block;
    font-size: 18px;
    color: ${({ theme }) => theme.white};
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
  }
`;
