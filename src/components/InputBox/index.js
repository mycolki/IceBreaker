import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showMessage, showAnswerBoxByInput } from '../../store/quizSlice';

import { countEachLetter } from '../../utils/countEachLetter';
import { inspectKorean } from '../../utils/inspectKorean';
import { VALIDATION_INPUT, VALIDATION_ANSWER } from '../../constants/messages';

import Button from '../share/Button';

function InputBox() {
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const isImageLoaded = useSelector((state) => state.quiz?.isImageLoaded);
  const [input, setInput] = useState('');

  const submitInput = (ev) => {
    ev.preventDefault();

    if (input === answer) {
      setInput('');
      return dispatch(showAnswerBoxByInput(input));
    }

    if (input.length === 0) {
      return dispatch(showMessage(VALIDATION_INPUT.FILL_BLANK));
    }

    if (!inspectKorean(input)) {
      setInput('');
      return dispatch(showMessage(VALIDATION_INPUT.ONLY_KOREAN));
    }

    if (input.length < answer.length) {
      return dispatch(showMessage(`정답은 ${answer.length}자리 입니다.`));
    }

    const numberOfLetter = countEachLetter(answer);
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
      const inputLetter = input[i];

      if (inputLetter === answer[i]) {
        count++;
        numberOfLetter[inputLetter] -= 1;
        continue;
      }

      if (numberOfLetter[inputLetter] > 0) {
        count++;
        numberOfLetter[inputLetter] -= 1;
      }
    }

    count === 0
      ? dispatch(showMessage(VALIDATION_ANSWER.ALL_WRONG))
      : dispatch(showMessage(`정답과 ${count}글자가 일치합니다`));

    dispatch(showAnswerBoxByInput(input));
    setInput('');
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    console.log('value', value);
    const inputValue = value.trim();
    console.log('answer', answer);

    if (answer && inputValue.length > answer.length) {
      setInput(inputValue.slice(0, answer.length));
      return dispatch(showMessage(`정답은 ${answer.length}자리 입니다.`));
    }

    setInput(inputValue);
  };

  return (
    <Wrapper>
      <Form onSubmit={submitInput} isAnswer={answer === input}>
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
          size="small"
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
  z-index: ${({ isAnswer }) => (isAnswer ? '99' : '999')};

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
