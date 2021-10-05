import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getDatabase, ref, onValue } from 'firebase/database';
import { getDataByFirebase } from '../../store/quizSlice';

import Menu from '../Menu';
import Ready from '../Ready';
import Breaking from '../Breaking';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const quizRef = ref(getDatabase());

      onValue(quizRef, async (snapshot) => {
        try {
          const data = snapshot.val();

          if (!data) {
            throw Error('게임에 필요한 데이터를 받아오지 못했습니다');
          }

          await dispatch(getDataByFirebase(data));
        } catch (err) {
          console.error(err);
        }
      });
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
      <Route path="/game/breaking">
        <Breaking />
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
