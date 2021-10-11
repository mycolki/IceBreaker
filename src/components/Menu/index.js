import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../share/Button';
import Portal from '../Portal';
import Modal from '../Modal';
import EnterRoomModal from '../Modal/EnterRoomModal';
import CreateRoomModal from '../Modal/CreateRoomModal';

function Menu() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [enterModalOpen, setEnterModalOpen] = useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEnterModal = () => {
    setEnterModalOpen(true);
  };

  const closeEnterModal = () => {
    setEnterModalOpen(false);
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
          <Link to="/ready">
            <Button size="large" color="skyBlue">
              혼자 얼음깨기
            </Button>
          </Link>
        </li>
        <li className="button">
          <Button size="large" color="skyBlue" onClick={openEnterModal}>
            같이 얼음깨기
          </Button>
        </li>
        {enterModalOpen && (
          <Portal>
            <Modal onClose={closeEnterModal} dimmed={true}>
              <EnterRoomModal closeModal={closeEnterModal} />
            </Modal>
          </Portal>
        )}
        <li className="button">
          <Button size="large" color="skyBlue" onClick={openCreateModal}>
            방 만들기
          </Button>
        </li>
        {createModalOpen && (
          <Portal>
            <Modal onClose={closeCreateModal} dimmed={true}>
              <CreateRoomModal closeModal={closeCreateModal} />
            </Modal>
          </Portal>
        )}
        <li className="button">
          <Button size="large" color="purple">
            랭킹보기
          </Button>
        </li>
        <li className="button">
          <Button size="large" color="purple">
            게임 방법
          </Button>
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
