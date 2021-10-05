import styled from 'styled-components';

function AnswerDisplayBox() {
  return (
    <Wrapper>
      <input className="answer" type="text" value="바" readOnly />
      <input className="answer" type="text" value="나" readOnly />
      <input className="answer" type="text" value="나" readOnly />
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
