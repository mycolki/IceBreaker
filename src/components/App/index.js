import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Menu from '../Menu';
import Ready from '../Ready';

function App() {
  return (
    <AppContainer>
      <Route exact path="/">
        <Menu />
      </Route>
      <Route path="/ready">
        <Ready />
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
  height: 91vh;
  margin: auto;
  background-color: white;
  transform: translate(-50%, -50%);
`;
