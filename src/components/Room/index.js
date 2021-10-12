import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { saveRoomData } from '../../store/battleSlice';
import { showMessage, onError } from '../../store/quizSlice';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { BATTLE } from '../../constants/messages';
import { ERROR } from '../../constants/error';
import { ROUTE, ROOM } from '../../constants/game';

import Message from '../share/Message';
import Button from '../share/Button';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle?.rooms);
  console.log(rooms);

  useEffect(() => {
    const fetchData = async () => {
      onValue(
        ref(getDatabase(), ROOM),
        async (snapshot) => {
          try {
            if (!snapshot.exists()) {
              throw Error(ERROR.FETCH_DATA);
            }

            const data = snapshot.val();
            await dispatch(saveRoomData(data));
          } catch (err) {
            dispatch(onError(err.message));
            history.push(ROUTE.ERROR);
          }
        },
        { onlyOnce: true },
      );
    };

    fetchData();
    dispatch(showMessage(dispatch(BATTLE.PLEASE_READY)));

    return () =>
      dispatch(
        showMessage({
          type: '',
          text: '',
        }),
      );
  }, [dispatch]);

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
        <RoomItem>
          <div className="breaker-box">
            <span className="breaker-order">BREAKER1</span>
            <span className="breaker-name">떡잎쌍잎</span>
          </div>
          <div className="vs">vs</div>
          <div className="breaker-box">
            <span className="breaker-order">BREAKER2</span>
            <span className="breaker-name">김치볶음</span>
          </div>
        </RoomItem>
      </RoomList>
      <RoomFooter>
        <Button text="방 ID로 입장" size="large" color="skyBlue" />
        <Link to={ROUTE.MENU}>
          <Button text="처음으로" size="large" color="pink" />
        </Link>
      </RoomFooter>
    </Container>
  );
}

export default Room;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.roomBg};
  text-align: center;
`;

const RoomHeader = styled.ul`
  ${flexCenter}
  height: 20%;

  .title {
    font-size: 36px;
    color: ${({ theme }) => theme.white};
  }
`;

const RoomList = styled.div`
  height: 55%;
  box-sizing: border-box;
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
  height: 20%;

  button {
    margin-bottom: 10px;
    font-family: 'Do hyeon';
  }
`;
