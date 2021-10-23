import { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';

import { stopCount, countAgain, showMessage } from '../../store/quizSlice';
import usedCokeWeb from '../../asset/usedCoke.webp';
import usedCoke from '../../asset/usedCoke.png';
import cokeWeb from '../../asset/coke.webp';
import coke from '../../asset/coke.png';
import { rightAndLeft } from '../../styles/share/animation';
import { flexCenter } from '../../styles/share/common';
import { ROUTE } from '../../constants/game';
import { RESET, GAME } from '../../constants/messages';

import ImgWithFallback from '../ImgWithFallback';
const Portal = lazy(() => import('../Portal'));
const Modal = lazy(() => import('../Modal'));
const HintModal = lazy(() => import('../Modal/HintModal'));

function Footer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAnswerTime = useSelector((state) => state.quiz?.isAnswerTime);
  const hints = useSelector((state) => state.quiz?.hints);
  const [hintModalOpen, setHintModalOpen] = useState(false);

  const openHintModal = () => {
    if (!isAnswerTime) return;

    dispatch(stopCount(true));
    setHintModalOpen(true);
  };

  const closeHintModal = () => {
    dispatch(showMessage(RESET));
    dispatch(stopCount(false));
    dispatch(countAgain(true));
    setHintModalOpen(false);
  };

  const moveToMenu = () => {
    history.push(ROUTE.MENU);
  };

  const displayCursorPointer = (ev) => {
    const container = ev.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  return (
    <Wrapper>
      <Stage width={120} height={60}>
        <Layer>
          <RegularPolygon
            x={37}
            y={31}
            sides={6}
            radius={26}
            fill={theme.purple}
            shadowColor="#000000"
            shadowBlur={4}
            shadowOffset={{ x: 1, y: 6 }}
            shadowOpacity={0.2}
            onClick={moveToMenu}
            onTouchEnd={moveToMenu}
            onMouseEnter={displayCursorPointer}
          />
          <RegularPolygon
            x={95}
            y={31}
            sides={6}
            radius={26}
            fill={isAnswerTime ? theme.deepPink : theme.lightGray}
            shadowColor="#000000"
            shadowBlur={4}
            shadowOffset={{ x: 1, y: 6 }}
            shadowOpacity={0.2}
            onMouseEnter={displayCursorPointer}
            onClick={openHintModal}
          />
        </Layer>
      </Stage>
      <Nav coke={coke}>
        <Link to={ROUTE.MENU}>
          <span className="menu">MENU</span>
        </Link>
        <span className="hint" onClick={openHintModal}>
          <img src={coke} alt="coke" width="20" height="25" />
          HINT
        </span>
        {hintModalOpen && (
          <Suspense fallback={null}>
            <Portal>
              <Modal onClose={closeHintModal} dimmed={true} background="red">
                <HintModal onClose={closeHintModal} />
              </Modal>
            </Portal>
          </Suspense>
        )}
      </Nav>
      <Cokes>
        {Array(5)
          .fill(null)
          .map((_, i) => {
            return (
              <ImgWithFallback
                key={i}
                src={i > hints - 1 ? usedCokeWeb : cokeWeb}
                fallback={i > hints - 1 ? usedCoke : coke}
                alt="coke"
                width="27"
                height="41"
              />
            );
          })}
      </Cokes>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.div`
  ${flexCenter}
  justify-content: space-between;
  height: 9%;
  padding-right: 10px;
`;

const Nav = styled.div`
  display: flex;
  font-size: 0.4em;
  color: ${({ theme }) => theme.white};
  transform: translate(-123px, 2px);

  .menu {
    display: block;
    color: ${({ theme }) => theme.white};
  }

  .hint {
    transform: translateX(25px);

    img {
      position: absolute;
      transform: translate(5px, -30px) rotate(20deg);
    }
  }
`;

const Cokes = styled.div`
  transform: translateY(5px);

  img {
    transform: rotate(20deg);
    animation: ${rightAndLeft} 1.1s infinite ease-in;
  }
`;
