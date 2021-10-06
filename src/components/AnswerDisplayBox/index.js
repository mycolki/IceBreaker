import styled from 'styled-components';

function AnswerDisplayBox({ correctLetters }) {
  console.log('디스플레이', correctLetters);
  return (
    <Wrapper>
      {correctLetters.map((str, index) => (
        <input
          key={str + index}
          className="answer"
          type="text"
          value={str}
          readOnly
        />
      ))}
    </Wrapper>
  );
}

export default AnswerDisplayBox;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
