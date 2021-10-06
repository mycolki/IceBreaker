import { useSelector } from 'react-redux';
import styled from 'styled-components';

function AnswerDisplayBox() {
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);

  return (
    <Wrapper>
      {answer &&
        [...answer].map((str, index) => (
          <input key={str + index} className="answer" type="text" readOnly />
        ))}
    </Wrapper>
  );
}

export default AnswerDisplayBox;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;

  .answer {
    width: 40px;
    height: 50px;
    margin: 7px;
    text-align: center;
    border-radius: 15px;
    font-size: 1.5em;
    color: ${({ theme }) => theme.deepGray};
  }
`;
