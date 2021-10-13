import { Link, useHistory } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';
import theme from '../../styles/theme';

import coke from '../../asset/coke.png';
import { rightAndLeft } from '../../styles/share/animation';
import { flexCenter } from '../../styles/share/common';
import { ROUTE } from '../../constants/game';

function Footer() {
  const history = useHistory();

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
            fill={theme.deepPink}
            shadowColor="#000000"
            shadowBlur={4}
            shadowOffset={{ x: 1, y: 6 }}
            shadowOpacity={0.2}
            onMouseEnter={displayCursorPointer}
          />
        </Layer>
      </Stage>
      <Nav coke={coke}>
        <Link to={ROUTE.MENU}>
          <span className="menu">MENU</span>
        </Link>
        <span className="hint">
          <img src={coke} alt="coke" width="20" height="25" />
          HINT
        </span>
      </Nav>
      <Cokes>
        <img src={coke} alt="coke" width="27" height="41" />
        <img src={coke} alt="coke" width="27" height="41" />
        <img src={coke} alt="coke" width="27" height="41" />
        <img src={coke} alt="coke" width="27" height="41" />
        <img src={coke} alt="coke" width="27" height="41" />
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
