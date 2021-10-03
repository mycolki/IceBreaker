import styled from 'styled-components';
import AnswerDisplayBox from '../AnswerDisplayBox';
import IcePlate from '../CubePlate';
import Footer from '../Footer';
import Header from '../Header';
import InputBox from '../InputBox';

function Breaking() {
  return (
    <Container>
      <Header />
      <AnswerDisplayBox />
      <IcePlate />
      <InputBox />
      <Footer />
    </Container>
  );
}

export default Breaking;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.mainSkyBlueBg};

  border: 4px solid black;
`;
