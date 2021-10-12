import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { showMessage } from '../../store/quizSlice';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { ROUTE } from '../../constants/game';
import { BATTLE, RESET } from '../../constants/messages';

import Message from '../share/Message';
import Button from '../share/Button';

function Rooms() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.battle?.rooms);

  useEffect(() => {
    dispatch(showMessage(BATTLE.WAITING));

    return () => dispatch(showMessage(RESET));
  });

  return (
    <Container>
      <RoomHeader>
        <h1 className="title">
          BREAKER <br />
          BATTLE
        </h1>
      </RoomHeader>
      <Message />
      <RoomList>
        {rooms &&
          Object.values(rooms).map((room) => (
            <Link to={`${ROUTE.ROOM}/${room.id}`}>
              <RoomItem key={room.id}>
                <div className="breaker-box">
                  <span className="breaker-order">BREAKER1</span>
                  <span className="breaker-name">{room.battler1.name}</span>
                </div>
                <div className="vs">vs</div>
                <div className="breaker-box">
                  <span className="breaker-order">BREAKER2</span>
                  <span className="breaker-name">
                    {room.battler2 ? room.battler2.name : '?'}
                  </span>
                </div>
              </RoomItem>
            </Link>
          ))}
      </RoomList>
      <RoomFooter>
        <Button text="방 ID로 입장" size="large" color="skyBlue" />
        <Link to={ROUTE.MENU}>
          <Button text="나가기" size="large" color="pink" />
        </Link>
      </RoomFooter>
    </Container>
  );
}

export default Rooms;

const RoomList = styled.div`
  height: 50%;
  padding: 30px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.skyBlue};

    &:hover {
      background-color: ${({ theme }) => theme.white};
      border: none;
    }
  }
`;

const RoomItem = styled.li`
  ${flexCenter}
  height: 70px;
  margin-bottom: 15px;
  border: 3px solid ${({ theme }) => theme.white};
  border-radius: 20px;
  border-style: dashed;
  cursor: pointer;
  font-family: 'Do hyeon';
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.lightPink};
  transition: transform 100ms ease-out;

  .breaker-box {
    ${flexCenterColumn}
    font-size: 16px;
    width: 60%;
  }

  .vs {
    font-size: 24px;
    color: ${({ theme }) => theme.deepBlue};
  }

  .breaker-order {
    color: ${({ theme }) => theme.deepGray};
  }

  .breaker-name {
    margin-top: 5px;
    font-size: 20px;
    color: ${({ theme }) => theme.white};
  }

  &:hover {
    background-color: ${({ theme }) => theme.skyBlue};
    transform: scale(1.01);
  }
`;

const RoomFooter = styled.div`
  ${flexCenterColumn}
  height: 25%;

  button {
    margin-bottom: 15px;
    font-family: 'Do hyeon';
  }
`;
