import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { saveQuizData, onError } from '../../store/quizSlice';
import { saveRoomData } from '../../store/battleSlice';
import { ROUTE, QUIZ, ROOM } from '../../constants/game';
import { ERROR } from '../../constants/error';

import Menu from '../Menu';
import Ready from '../Ready';
import Breaking from '../Breaking';
import Rooms from '../Rooms';
import Room from '../Room';
import GameOver from '../GameOver';
import ErrorBox from '../ErrorBox';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(
          ref(getDatabase(), QUIZ),
          async (snapshot) => {
            if (!snapshot.exists()) {
              throw Error(ERROR.FETCH_DATA);
            }

            const data = snapshot.val();

            if (!data) return;

            await dispatch(saveQuizData(data));
          },
          { onlyOnce: true },
        );

        onValue(
          ref(getDatabase(), ROOM),
          async (snapshot) => {
            const data = snapshot.val();

            if (!data) return;

            await dispatch(saveRoomData(data));
          },
          { onlyOnce: true },
        );
      } catch (err) {
        dispatch(onError(err.message));
        history.push(ROUTE.ERROR);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <AppContainer>
      <Switch>
        <Route exact path={ROUTE.MENU} component={Menu} />
        <Route path={ROUTE.READY} component={Ready} />
        <Route path={ROUTE.BREAKING} component={Breaking} />
        <Route path={ROUTE.ROOMS} component={Rooms} />
        <Route path={ROUTE.ROOM_ID} component={Room} />
        <Route path={ROUTE.GAME_OVER} component={GameOver} />
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
