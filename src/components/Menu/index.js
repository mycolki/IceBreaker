import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { getDatabase, ref, get, child } from '@firebase/database';
import { saveQuizData, onError } from '../../store/quizSlice';
import { smallPounding } from '../../styles/share/animation';
import { ROUTE, QUIZ } from '../../constants/game';
import { ERROR } from '../../constants/error';

import Button from '../share/Button';

function Menu() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const snapshot = await get(child(ref(getDatabase()), QUIZ));

        const quiz = snapshot.val();

        if (quiz) {
          dispatch(saveQuizData(quiz));
        }
      } catch (err) {
        dispatch(onError(ERROR.LOAD_DATA));
        history.push(ROUTE.ERROR);
      }
    };

    getQuiz();
  }, [dispatch, history]);

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
        <Link to={ROUTE.RANKING}>
          <li className="button">
            <Button text="랭킹보기" size="large" color="purple" />
          </li>
        </Link>
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
  background-image: url(/background/menu.jpg);
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 53%;
  text-align: center;

  .app-title {
    position: absolute;
    top: 73%;
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
  height: 47%;
  text-align: center;

  button {
    margin-bottom: 15px;
    animation: ${smallPounding} 1.2s infinite;
  }
`;
