import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { showMessage, onError } from '../../store/quizSlice';
import { saveRoomData } from '../../store/battleSlice';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { ROUTE, ROOM } from '../../constants/game';
import { BATTLE, RESET } from '../../constants/messages';

import Portal from '../Portal';
import Modal from '../Modal';
import EnterRoomModal from '../Modal/EnterRoomModal';
import Message from '../share/Message';
import Button from '../share/Button';

function Rooms() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle?.rooms);
  const [enterModalOpen, setEnterModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(
          ref(getDatabase(), ROOM),
          async (snapshot) => {
            const data = snapshot.val();

            if (!data) return;

            await dispatch(saveRoomData(data));
          },
          { onlyOnce: true },
        );
      } catch (err) {
        dispatch(onError(err.message));
        history.push(ROUTE.ERROR);
      }
    };

    fetchData();
    dispatch(showMessage(BATTLE.WAITING));

    return () => dispatch(showMessage(RESET));
  }, [dispatch, history]);

  const openEnterModal = () => {
    setEnterModalOpen(true);
    dispatch(showMessage(RESET));
  };

  const closeEnterModal = () => {
    setEnterModalOpen(false);
    dispatch(RESET);
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
        <Button
          text="방 ID로 입장"
          size="large"
          color="skyBlue"
          onClick={openEnterModal}
        />
        {enterModalOpen && (
          <Portal>
            <Modal onClose={closeEnterModal} dimmed={true}>
              <EnterRoomModal closeModal={closeEnterModal} />
            </Modal>
          </Portal>
        )}
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
