import styled from 'styled-components';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import IcePlate from '../CubePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';

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
  background: ${({ theme }) => theme.breakingBg};
  border: 4px solid black;
`;
