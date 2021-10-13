import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RiGamepadFill, RiGamepadLine } from 'react-icons/ri';
import { IoCaretBack } from 'react-icons/io5';

import styled from 'styled-components';

import { getDatabase, ref, set, onValue } from 'firebase/database';
import { showMessage } from '../../store/quizSlice';
import { saveRoomData, saveRoomId } from '../../store/battleSlice';

import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { ROUTE, ROOM } from '../../constants/game';
import { BATTLE, RESET } from '../../constants/messages';

import Portal from '../Portal';
import Modal from '../Modal';
import CreateRoomModal from '../Modal/CreateRoomModal';
import EnterRoomModal from '../Modal/EnterRoomModal';
import Message from '../share/Message';
import Button from '../share/Button';

function Rooms() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle?.rooms);
  const roomId = useSelector((state) => state.battle?.roomId);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [enterModalOpen, setEnterModalOpen] = useState(false);

  useEffect(() => {
    dispatch(showMessage(BATTLE.WAITING));

    onValue(ref(getDatabase(), ROOM), (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      dispatch(saveRoomData(data));
    });

    return () => {
      dispatch(showMessage(RESET));
      dispatch(saveRoomId(''));
    };
  }, [dispatch, history]);

  const enterRoom = (roomId) => {
    dispatch(saveRoomId(roomId));
    openEnterModal();
  };

  const openEnterModal = () => {
    setEnterModalOpen(true);
    dispatch(showMessage(RESET));
  };

  const closeEnterModal = () => {
    setEnterModalOpen(false);
    dispatch(showMessage(RESET));
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
    dispatch(showMessage(RESET));
  };

  const closeCreateModal = () => {
    if (roomId) {
      set(ref(getDatabase(), `${ROOM}/${roomId}`), null);
    }

    setCreateModalOpen(false);
    dispatch(showMessage(RESET));
  };

  return (
    <Container>
      <RoomHeader>
        <h1 className="title">
          BREAKER <br />
          BATTLE
        </h1>
        <Link to={ROUTE.MENU}>
          <BackButton type="button">
            <IoCaretBack />
          </BackButton>
        </Link>
      </RoomHeader>
      <Message />
      <RoomList>
        {rooms
          ? Object.entries(rooms).map(([id, room]) => (
              <RoomItem
                key={id}
                onClick={() => enterRoom(id)}
                active={room.active}
              >
                {room.active ? null : (
                  <span className="on-battle">
                    <RiGamepadFill />
                  </span>
                )}
                <div className="breaker-box">
                  <span className="breaker-order">BREAKER1</span>
                  <span className="breaker-name">{room.breakers[0].name}</span>
                </div>
                <div className="vs">vs</div>
                <div className="breaker-box">
                  <span className="breaker-order">BREAKER2</span>
                  <span className="breaker-name">
                    {room.breakers[1] ? room.breakers[1].name : '?'}
                  </span>
                </div>
              </RoomItem>
            ))
          : null}
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
        <Button
          text="방 만들기"
          size="large"
          color="pink"
          onClick={openCreateModal}
        />
        {createModalOpen && (
          <Portal>
            <Modal onClose={closeCreateModal} dimmed={true}>
              <CreateRoomModal closeModal={closeCreateModal} />
            </Modal>
          </Portal>
        )}
      </RoomFooter>
    </Container>
  );
}

export default Rooms;

const BackButton = styled.button`
  position: absolute;
  top: 5px;
  left: 0;
  background-color: transparent;
  font-size: 30px;
  color: white;
`;

const RoomList = styled.div`
  height: 50%;
  padding: 15px 30px;
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
  position: relative;
  height: 70px;
  margin-bottom: 15px;
  border: 3px solid ${({ theme }) => theme.white};
  border-radius: 20px;
  border-style: dashed;
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
  font-family: 'Do hyeon';
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme, active }) =>
    active ? theme.lightPink : theme.purple};
  transition: transform 100ms ease-out;

  .breaker-box {
    ${flexCenterColumn}
    font-size: 16px;
    width: 60%;
  }

  .vs {
    font-size: 24px;
    color: ${({ theme }) => theme.skyBlue};
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

  .on-battle {
    position: absolute;
    top: -13px;
    left: -17px;
    width: 38px;
    height: 28px;
    padding-bottom: 10px;
    font-size: 34px;
    border-radius: 30%;
    background-color: ${({ theme }) => theme.deepGray};
    color: ${({ theme }) => theme.skyBlue};
    transform: rotate(180deg);
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
