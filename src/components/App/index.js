import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { saveQuizData } from '../../store/quizSlice';

import Menu from '../Menu';
import Ready from '../Ready';
import Breaking from '../Breaking';
import GameOver from '../GameOver';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      onValue(
        ref(getDatabase()),
        async (snapshot) => {
          try {
            if (!snapshot.exists()) {
              throw Error('게임에 필요한 데이터를 받아오지 못했습니다');
            }

            const data = snapshot.val();
            await dispatch(saveQuizData(data));
          } catch (err) {
            console.error(err);
          }
        },
        { onlyOnce: true },
      );
    };

    fetchData();
  }, [dispatch]);

  return (
    <AppContainer>
      <Route exact path="/">
        <Menu />
      </Route>
      <Route path="/ready">
        <Ready />
      </Route>
      <Route path="/breaking">
        <Breaking />
      </Route>
      <Route path="/gameover">
        <GameOver />
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
