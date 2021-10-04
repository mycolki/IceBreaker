import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import styled from 'styled-components';

import theme from '../../styles/theme';
import coke from '../../asset/coke.png';

function Footer() {
  const history = useHistory();

  const moveToMenu = () => {
    history.push('/');
  };

  const displayCursorPointer = (ev) => {
    const container = ev.target.getStage().container();
    container.style.cursor = 'pointer';
  };

  return (
    <Wrapper>
      <Stage width="120" height="60">
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
      <Nav>
        <Link to="/">
          <span className="menu">MENU</span>
        </Link>
        <span className="hint">HINT</span>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8.5%;
  padding-right: 10px;
`;

const Nav = styled.div`
  font-size: 0.4em;
  transform: translate(-106px, 2px);
  color: ${({ theme }) => theme.white};

  .menu {
    margin-right: 25px;
  }
`;

const Cokes = styled.div`
  transform: translateY(3px);

  img {
    transform: rotate(20deg);
  }
`;
