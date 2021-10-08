import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { showAnswerBoxByInput, passNextLevel } from '../../store/quizSlice';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../share/Message';
import IcePlate from '../IcePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';
import Button from '../share/Button';
import theme from '../../styles/theme';

function Breaking() {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const level = useSelector((state) => state.quiz?.currentQuestion?.level);
  const userInput = useSelector((state) => state.quiz?.userInput);
  const imgUrl = useSelector((state) => state.quiz?.currentQuestion?.imgUrl);

  const isAnswer = userInput ? answer === userInput : null;
  const QUIZ_LENGTH = 7;

  const goToNextLevel = () => {
    if (level === QUIZ_LENGTH) {
      console.log('마지막 7레벨');
    }

    dispatch(showAnswerBoxByInput(''));
    dispatch(passNextLevel());
  };

  return (
    <Container>
      <Header />
      <AnswerDisplayBox />
      {userInput && (
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
                <Link to="/game/breaking">
                  <Button
                    className="button"
                    size="medium"
                    color="lightPurple"
                    onClick={goToNextLevel}
                  >
                    NEXT
                  </Button>
                </Link>
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
