import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { saveQuizData, onError } from '../../store/quizSlice';
import { ERROR } from '../../constants/error';
import { ROUTE, QUIZ } from '../../constants/game';

import Menu from '../Menu';
import Ready from '../Ready';
import Breaking from '../Breaking';
import GameOver from '../GameOver';
import ErrorBox from '../ErrorBox';
import Room from '../Room';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      onValue(
        ref(getDatabase(), QUIZ),
        async (snapshot) => {
          try {
            if (!snapshot.exists()) {
              throw Error(ERROR.FETCH_DATA);
            }

            const data = snapshot.val();
            await dispatch(saveQuizData(data));
          } catch (err) {
            dispatch(onError(err.message));
            history.push(ROUTE.ERROR);
          }
        },
        { onlyOnce: true },
      );
    };

    fetchData();
  }, []);

  return (
    <AppContainer>
      <Route exact path={ROUTE.MENU}>
        <Menu />
      </Route>
      <Route path={ROUTE.READY}>
        <Ready />
      </Route>
      <Route path={ROUTE.BREAKING}>
        <Breaking />
      </Route>
      <Route path={ROUTE.ROOM}>
        <Room />
      </Route>
      <Route path={ROUTE.GAME_OVER}>
        <GameOver />
      </Route>
      <Route path={ROUTE.ERROR}>
        <ErrorBox />
      </Route>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 375px;
  height: 713px;
  margin: auto;
  background-color: white;
  transform: translate(-50%, -50%);
`;
