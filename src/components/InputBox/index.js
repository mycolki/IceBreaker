import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  showMessage,
  showQuestionResult,
  showAnswerBoxByInput,
} from '../../store/quizSlice';

import { countEachLetter } from '../../utils/countEachLetter';
import { inspectKorean } from '../../utils/inspectKorean';
import { VALIDATE_INPUT, VALIDATE_ANSWER } from '../../constants/Message';

import Button from '../share/Button';

function InputBox() {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const isImageLoaded = useSelector((state) => state.quiz?.isImageLoaded);
  const [input, setInput] = useState('');

  const submitInput = (ev) => {
    ev.preventDefault();

    if (input === answer) {
      dispatch(showAnswerBoxByInput(input));
      return dispatch(showQuestionResult('정답!'));
    }

    if (input.length === 0) {
      return dispatch(showMessage(VALIDATE_INPUT.FILL_BLANK));
    }

    if (!inspectKorean(input)) {
      setInput('');
      return dispatch(showMessage(VALIDATE_INPUT.ONLY_KOREAN));
    }

    if (input.length < answer.length) {
      return dispatch(showMessage(`정답은 ${answer.length}자리 입니다.`));
    }

    const numberOfLetter = countEachLetter(answer);
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
      const inputStr = input[i];
      if (inputStr === answer[i]) {
        count++;
        numberOfLetter[inputStr] -= 1;
        continue;
      }

      if (numberOfLetter[inputStr] > 0) {
        count++;
        numberOfLetter[inputStr] -= 1;
      }
    }

    count === 0
      ? dispatch(showMessage(VALIDATE_ANSWER.ALL_WRONG))
      : dispatch(showMessage(`정답과 ${count}글자가 일치합니다`));

    dispatch(showAnswerBoxByInput(input));
    dispatch(showQuestionResult('얼음땡!'));
    setInput('');
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();

    if (inputValue.length > answer.length) {
      setInput(inputValue.slice(0, answer.length));
      return dispatch(showMessage(`정답은 ${answer.length}자리 입니다.`));
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
        <Button
          color="lightPurple"
          size="medium"
          type="submit"
          disabled={!isImageLoaded}
        >
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
