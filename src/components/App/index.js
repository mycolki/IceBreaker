import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getDatabase, ref, get, child } from 'firebase/database';
import { saveQuizData, onError } from '../../store/quizSlice';
import { ROUTE, QUIZ } from '../../constants/game';
import { ERROR } from '../../constants/error';

import Menu from '../Menu';
import Ready from '../Ready';
import Breaking from '../Breaking';
import Rooms from '../Rooms';
import Room from '../Room';
import GameOver from '../GameOver';
import BattleOver from '../BattleOver';
import ErrorBox from '../ErrorBox';

function App() {
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
    <AppContainer>
      <Switch>
        <Route exact path={ROUTE.MENU} component={Menu} />
        <Route path={[ROUTE.READY_ID, ROUTE.READY]} component={Ready} />
        <Route
          path={[ROUTE.BREAKING_ID, ROUTE.BREAKING]}
          component={Breaking}
        />
        <Route path={ROUTE.ROOMS} component={Rooms} />
        <Route path={ROUTE.ROOM_ID} component={Room} />
        <Route path={ROUTE.GAME_OVER} component={GameOver} />
        <Route path={ROUTE.BATTLE_OVER_ID} component={BattleOver} />
        <Route path={ROUTE.ERROR} component={ErrorBox} />
      </Switch>
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
