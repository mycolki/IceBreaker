import styled from 'styled-components';
import Menu from '../Menu';

function App() {
  return (
    <AppContainer>
      <Menu />
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
