import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { smallPounding } from '../../styles/share/animation';
import { ROUTE } from '../../constants/game';

import Button from '../share/Button';

function Menu() {
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
  height: 55%;
  text-align: center;

  .app-title {
    position: absolute;
    top: 60%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 40px;
    color: white;
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepBlue};
    transform: translate(-50%, -50%);
  }
`;

const MenuButtons = styled.ul`
  height: 45%;
  text-align: center;

  button {
    margin-bottom: 15px;
    animation: ${smallPounding} 1.2s infinite;
  }
`;
