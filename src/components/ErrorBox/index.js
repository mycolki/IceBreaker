import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTE } from '../../constants/quiz';
import { flexCenterColumn } from '../../styles/share/common';

import Button from '../share/Button';

function ErrorBox() {
  const error = useSelector((state) => state.quiz?.error);

  return (
    <Container>
      <h1 className="message">🙈{error}</h1>
      <Link to={ROUTE.MENU}>
        <Button text="메뉴로 돌아가기" size="large" color="pink" />
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
  background: ${({ theme }) => theme.loseGameBg};

  .message {
    margin-bottom: 50px;
    text-align: center;
    font-family: 'Do hyeon';
    font-size: 24px;
    overflow-wrap: break-word;
    color: white;
  }
`;
