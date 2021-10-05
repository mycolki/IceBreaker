import styled from 'styled-components';

import Button from '../../components/share/Button';

function InputBox() {
  return (
    <Wrapper>
      <Form>
        <input type="text" placeholder="Guess What" />
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
  height: 16%;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  text-align: center;

  input {
    width: 140px;
    height: 55px;
    padding: 0;
    margin-right: 10px;
    text-align: center;
    border-radius: 20px;
    background-color: #ffffff80;
    box-shadow: ${({ theme }) => theme.boxShadow};

    ::placeholder {
      font-size: 0.8em;
      color: ${({ theme }) => theme.deepGray60};
    }
  }
`;
