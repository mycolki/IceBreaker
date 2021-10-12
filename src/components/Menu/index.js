import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, set } from '@firebase/database';
import { showMessage } from '../../store/quizSlice';
import { ROUTE, ROOM } from '../../constants/game';
import { RESET } from '../../constants/messages';

import Button from '../share/Button';
import Portal from '../Portal';
import Modal from '../Modal';
import EnterRoomModal from '../Modal/EnterRoomModal';
import CreateRoomModal from '../Modal/CreateRoomModal';

function Menu() {
  const dispatch = useDispatch();
  const isRoom = useSelector((state) => state.battle?.isRoom);
  const roomId = useSelector((state) => state.battle?.roomId);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [enterModalOpen, setEnterModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    if (isRoom && roomId) {
      set(ref(getDatabase(), `${ROOM}/${roomId}`), null);
    }

    setCreateModalOpen(false);
    dispatch(showMessage(RESET));
  };

  const openEnterModal = () => {
    setEnterModalOpen(true);
  };

  const closeEnterModal = () => {
    setEnterModalOpen(false);
    dispatch(RESET);
  };

  return (
    <Container>
      <TitleWrapper>
        <h1 className="app-title">
          ICE <br />
          BREAKER
        </h1>
      </TitleWrapper>
      <MenuButtons>
        <li className="button">
          <Link to={ROUTE.READY}>
            <Button text="혼자 얼음깨기" size="large" color="skyBlue" />
          </Link>
        </li>
        <li className="button">
          <Link to={ROUTE.ROOMS}>
            <Button text="같이 얼음깨기" size="large" color="skyBlue" />
          </Link>
        </li>
        <li className="button">
          <Button
            text="방 입장하기"
            size="large"
            color="pink"
            onClick={openEnterModal}
          />
        </li>
        {enterModalOpen && (
          <Portal>
            <Modal onClose={closeEnterModal} dimmed={true}>
              <EnterRoomModal closeModal={closeEnterModal} />
            </Modal>
          </Portal>
        )}
        <li className="button">
          <Button
            text="방 만들기"
            size="large"
            color="pink"
            onClick={openCreateModal}
          />
        </li>
        {createModalOpen && (
          <Portal>
            <Modal onClose={closeCreateModal} dimmed={true}>
              <CreateRoomModal closeModal={closeCreateModal} />
            </Modal>
          </Portal>
        )}

        <li className="button">
          <Button text="랭킹보기" size="large" color="purple" />
        </li>
        <li className="button">
          <Button text="게임 방법" size="large" color="purple" />
        </li>
      </MenuButtons>
    </Container>
  );
}

export default Menu;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.menuBg};
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 48%;
  text-align: center;

  .app-title {
    position: absolute;
    top: 75%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 2em;
    color: white;
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepBlue};
    transform: translate(-50%, -50%);
  }
`;

const MenuButtons = styled.ul`
  height: 52%;
  text-align: center;

  .button {
    margin-bottom: 0.7em;
  }
`;
