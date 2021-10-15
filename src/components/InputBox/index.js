import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import styled from 'styled-components';

import { getDatabase, ref, update } from 'firebase/database';

import {
  showMessage,
  showAnswerBoxByInput,
  toggleAnswer,
  addScore,
} from '../../store/quizSlice';
import { countEachLetter } from '../../utils/countEachLetter';
import { inspectKorean } from '../../utils/inspectInputType';

import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { ROOM } from '../../constants/game';
import { VALIDATION_INPUT, VALIDATION_ANSWER } from '../../constants/messages';

import Button from '../share/Button';

function InputBox() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const isImageLoaded = useSelector((state) => state.quiz?.isImageLoaded);
  const isNotBreaking = useSelector((state) => state.quiz?.isNotBreaking);
  const isTimeOver = useSelector((state) => state.quiz?.isTimeOver);
  const score = useSelector((state) => state.quiz?.score);
  const [input, setInput] = useState('');

  const breakers = useSelector((state) => state.battle?.breakers);
  const [name, setName] = useState('');

  useEffect(() => {
    if (isTimeOver) {
      setInput('');
    }

    const { userName } = JSON.parse(window.sessionStorage.getItem('userName'));
    setName(userName);
  }, [isTimeOver]);

  const submitInput = (ev) => {
    ev.preventDefault();

    if (input === answer) {
      setInput('');
      dispatch(addScore());
      dispatch(showAnswerBoxByInput(input));

      if (breakers) {
        const updatedScore = _.cloneDeep(breakers).map((breaker) => {
          if (breaker.name === name) {
            breaker.score = score;
          }

          return breaker;
        });

        update(ref(getDatabase(), `${ROOM}/${roomId}`), {
          breakers: updatedScore,
        });
      }

      return dispatch(toggleAnswer(true));
    }

    if (input.length === 0) {
      return dispatch(showMessage(VALIDATION_INPUT.FILL_BLANK));
    }

    if (!inspectKorean(input)) {
      setInput('');
      return dispatch(showMessage(VALIDATION_INPUT.ONLY_KOREAN));
    }

    if (input.length < answer.length) {
      return dispatch(
        showMessage({
          type: VALIDATION_INPUT.TYPE,
          text: `정답은 ${answer.length}자리 입니다.`,
        }),
      );
    }

    const numberOfLetter = countEachLetter(answer);
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
      const str = input[i];

      if (str === answer[i]) {
        count++;
        numberOfLetter[str] -= 1;
        continue;
      }

      if (numberOfLetter[str] > 0) {
        count++;
        numberOfLetter[str] -= 1;
      }
    }

    count === 0
      ? dispatch(showMessage(VALIDATION_ANSWER.ALL_WRONG))
      : dispatch(
          showMessage({
            type: VALIDATION_ANSWER.TYPE,
            text: `정답과 ${count}글자가 일치합니다`,
          }),
        );

    dispatch(showAnswerBoxByInput(input));
    setInput('');
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();

    if (answer && inputValue.length > answer.length) {
      setInput(inputValue.slice(0, answer.length));
      return dispatch(
        showMessage({
          type: VALIDATION_INPUT.TYPE,
          text: `정답은 ${answer.length}자리 입니다.`,
        }),
      );
    }

    setInput(inputValue);
  };

  return (
    <Wrapper>
      {isNotBreaking && (
        <Form onSubmit={submitInput} isAnswer={answer === input}>
          <input
            className="input"
            type="text"
            lang="ko"
            placeholder="Guess What"
            value={input}
            onChange={handleInput}
            autoFocus
          />
          <Button
            text="Break"
            color="lightPurple"
            size="small"
            type="submit"
            disabled={!isImageLoaded}
          />
        </Form>
      )}
    </Wrapper>
  );
}

export default InputBox;

const Wrapper = styled.div`
  ${flexCenterColumn}
  height: 16%;
`;

const Form = styled.form`
  ${flexCenter}
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
