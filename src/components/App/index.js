import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { ROUTE } from '../../constants/game';

import Menu from '../Menu';
import Ready from '../Ready';
import Breaking from '../Breaking';
import Rooms from '../Rooms';
import Room from '../Room';
import GameOver from '../GameOver';
import BattleOver from '../BattleOver';
import ErrorBox from '../ErrorBox';

function App() {
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
        <Redirect path="*" to={ROUTE.MENU} />
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
