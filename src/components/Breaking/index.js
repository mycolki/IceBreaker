import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

import { showAnswerBoxByInput, passNextLevel } from '../../store/quizSlice';
import { ROUTE } from '../../constants/quiz';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../share/Message';
import IcePlate from '../IcePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';
import Button from '../share/Button';

function Breaking() {
  const dispatch = useDispatch();
  const history = useHistory();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const userInput = useSelector((state) => state.quiz?.userInput);
  const isEnding = useSelector((state) => state.quiz?.isEnding);

  const isAnswer = userInput ? answer === userInput : null;
  const LAST_LEVEL = 5;

  const goToNextLevel = (ev) => {
    if (level === LAST_LEVEL) {
      return history.push(ROUTE.GAME_OVER);
    }

    dispatch(showAnswerBoxByInput(''));
    dispatch(passNextLevel());
  };

  return (
    <Container>
      <Header />
      <AnswerDisplayBox />
      {isEnding && (
        <Answer isAnswer={isAnswer}>
          <div className="result">
            <span className="result-text">{isAnswer ? '정답' : '얼음땡!'}</span>
            {isAnswer && (
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
                  onClick={goToNextLevel}
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

    .start-text {
      font-size: 45px;
    }

    .result-text {
      font-size: 45px;
    }

    .img {
      margin: 20px;
      box-shadow: ${({ theme }) => theme.boxShadow};
    }
  }
`;
