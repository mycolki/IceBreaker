import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useSound from 'use-sound';

import { flexCenterColumn } from '../../styles/share/common';
import { ROUTE } from '../../constants/game';

import Button from '../share/Button';

function ErrorBox() {
  const location = useLocation();
  const [play] = useSound('/audio/click.mp3');

  return (
    <Container>
      <h1 className="error-message">🙈{location.state.error}</h1>
      <Link to={ROUTE.MENU}>
        <Button
          text="메뉴로 돌아가기"
          size="large"
          backgroundColor="pink"
          onClick={play}
        />
      </Link>
    </Container>
  );
}

export default ErrorBox;

const Container = styled.div`
  ${flexCenterColumn}

  z-index: 999;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 50px;
  background: ${({ theme }) => theme.loseResultBg};

  .message {
    margin-bottom: 50px;
    text-align: center;
    font-family: 'Do hyeon';
    font-size: 24px;
    overflow-wrap: break-word;
    color: white;
  }
`;
