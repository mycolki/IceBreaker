import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { inspectKorean } from '../../utils/inspectKorean';
import { VALIDATE_INPUT } from '../../constants/Message';

import Button from '../../components/share/Button';

function InputBox({ compareWithAnswer, showMessage }) {
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const [input, setInput] = useState('');

  const submitInput = (ev) => {
    ev.preventDefault();

    if (input.length === 0) {
      return showMessage(VALIDATE_INPUT.FILL_BLANK);
    }

    if (!inspectKorean(input)) {
      setInput('');
      return showMessage(VALIDATE_INPUT.ONLY_KOREAN);
    }

    if (input.length < answer.length) {
      return showMessage(`정답은 ${answer.length}자리 입니다.`);
    }

    compareWithAnswer(input);
    setInput('');
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();

    if (inputValue.length > answer.length) {
      setInput(inputValue.slice(0, answer.length));
      return showMessage(`정답은 ${answer.length}자리 입니다.`);
    }

    setInput(inputValue);
  };

  return (
    <Wrapper>
      <Form onSubmit={submitInput}>
        <input
          className="input"
          type="text"
          lang="ko"
          placeholder="Guess What"
          value={input}
          onChange={handleInput}
        />
        <Button color="lightPurple" size="medium" type="submit">
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

  .input {
    width: 140px;
    height: 50px;
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
