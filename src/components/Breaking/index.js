import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../share/Message';
import IcePlate from '../IcePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';
import Button from '../share/Button';
import theme from '../../styles/theme';

function Breaking() {
  const history = useHistory();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const userInput = useSelector((state) => state.quiz?.userInput);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);

  const moveToReady = () => {
    history.push('/Ready');
  };

  return (
    <Container>
      <Header />
      <AnswerDisplayBox />
      {userInput && (
        <Answer isAnswer={answer === userInput}>
          <div className="result">
            <span className="result-text">
              {answer === userInput ? '정답' : '얼음땡!'}
            </span>
            {answer === userInput && (
              <>
                <img
                  className="img"
                  src={imgUrl}
                  alt={answer}
                  width="130"
                  height="130"
                />
                <Button
                  className="button"
                  size="medium"
                  color="lightPurple"
                  onClick={moveToReady}
                >
                  NEXT
                </Button>
              </>
            )}
          </div>
        </Answer>
      )}
      <Message />
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

const Answer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isAnswer }) => isAnswer && `${theme.deepGray}85`};
  z-index: ${({ isAnswer }) => isAnswer && '100'};

  .result {
    z-index: 199;
    position: absolute;
    top: ${({ isAnswer }) => (isAnswer ? '7%' : '23%')};
    left: 50%;
    text-align: center;
    color: ${({ theme }) => theme.white};
    transform: translate(-50%, 50%);

    .result-text {
      font-size: 45px;
    }

    .img {
      margin: 20px;
      box-shadow: ${({ theme }) => theme.boxShadow};
    }
  }
`;
