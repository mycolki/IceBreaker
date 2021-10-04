import styled from 'styled-components';

import Button from '../../components/share/Button';

function InputBox() {
  return (
    <Wrapper>
      <Form>
        <input type="text" placeholder="정답을 입력해주세요" />
        <Button color="lightPurple" size="medium">
          Break
        </Button>
      </Form>
    </Wrapper>
  );
}

export default InputBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 11%;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  text-align: center;

  input {
    width: 130px;
    height: 45px;
    padding: 0;
    margin-right: 10px;
    border: 0;
    text-align: center;
    border-radius: 20px;
    background-color: #ffffff80;

    ::placeholder {
      font-size: 0.9em;
      color: ${({ theme }) => theme.purple};
    }
  }
`;
