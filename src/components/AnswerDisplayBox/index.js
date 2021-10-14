import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { flexCenter } from '../../styles/share/common';

function AnswerDisplayBox() {
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const userInput = useSelector((state) => state.quiz?.userInput);

  return (
    <Wrapper>
      {answer &&
        [...answer].map((letter, i) => (
          <input
            key={letter + i}
            className="answer"
            type="text"
            value={letter === userInput[i] ? letter : ''}
            readOnly
            autoFocus
          />
        ))}
    </Wrapper>
  );
}

export default AnswerDisplayBox;

const Wrapper = styled.div`
  ${flexCenter}

  height: 11%;

  .answer {
    width: 40px;
    height: 52px;
    margin: 7px;
    text-align: center;
    border-radius: 15px;
    font-size: 1.5em;
    color: ${({ theme }) => theme.deepGray};
  }
`;
