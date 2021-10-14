import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { saveQuizData } from '../../store/quizSlice';
import { saveRoomData } from '../../store/battleSlice';
import { ROUTE, QUIZ, ROOM } from '../../constants/game';

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
    onValue(ref(getDatabase(), QUIZ), (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      dispatch(saveQuizData(data));
    });

    onValue(ref(getDatabase(), ROOM), (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      dispatch(saveRoomData(data));
    });
  }, [dispatch, history]);

  return (
    <AppContainer>
      <Route exact path={ROUTE.MENU} component={Menu} />
      <Route path={ROUTE.READY} component={Ready} />
      <Route path={ROUTE.READY_ID} component={Ready} />
      <Route path={ROUTE.BREAKING} component={Breaking} />
      <Route path={ROUTE.BREAKING_ID} component={Breaking} />
      <Route path={ROUTE.ROOMS} component={Rooms} />
      <Route path={ROUTE.ROOM_ID} component={Room} />
      <Route path={ROUTE.GAME_OVER} component={GameOver} />
      <Route path={ROUTE.ERROR} component={ErrorBox} />
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
