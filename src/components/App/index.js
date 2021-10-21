import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTE } from '../../constants/game';

import DotSpinner from '../share/LoadingSpinner/DotSpinner';

const Menu = lazy(() => import('../Menu'));
const Ready = lazy(() => import('../Ready'));
const Breaking = lazy(() => import('../Breaking'));
const Rooms = lazy(() => import('../Rooms'));
const Room = lazy(() => import('../Room'));
const GameOver = lazy(() => import('../GameOver'));
const BattleOver = lazy(() => import('../BattleOver'));
const Ranking = lazy(() => import('../Ranking'));
const ErrorBox = lazy(() => import('../ErrorBox'));

function App() {
  useEffect(() => {
    window.Modernizr.on('webp', function (result) {
      if (result) {
        document
          .getElementsByClassName('no-webp')[0]
          .classList.remove('no-webp');
      } else {
        document.getElementsByClassName('webp')[0].classList.remove('webp');
      }
    });
  }, []);

  return (
    <AppContainer>
      <Suspense fallback={<DotSpinner color="purple" />}>
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
          <Route path={ROUTE.RANKING} component={Ranking} />
          <Route path={ROUTE.ERROR} component={ErrorBox} />
          <Redirect path="*" to={ROUTE.MENU} />
        </Switch>
      </Suspense>
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
