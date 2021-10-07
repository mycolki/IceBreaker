import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../share/Message';
import IcePlate from '../IcePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';

function Breaking() {
  const questionResult = useSelector((state) => state.quiz?.questionResult);

  return (
    <Container>
      <Header />
      <AnswerDisplayBox />
      <Message />
      {questionResult && (
        <AnswerResult>
          <span>{questionResult}</span>
        </AnswerResult>
      )}
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
`;

const AnswerResult = styled.div`
  z-index: 100;
  position: absolute;
  left: 50%;
  font-size: 45px;
  -webkit-text-stroke: 1px ${({ theme }) => theme.deepGray};
  color: ${({ theme }) => theme.deepGray};
  transform: translate(-50%, 10%);
`;
