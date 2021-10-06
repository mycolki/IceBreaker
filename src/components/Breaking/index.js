import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../Header';
import AnswerDisplayBox from '../AnswerDisplayBox';
import Message from '../Message.js';
import IcePlate from '../CubePlate';
import InputBox from '../InputBox';
import Footer from '../Footer';

function Breaking() {
  const answer = useSelector((state) => state.quiz?.currentQuestion?.answer);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [letterCounts, setLetterCounts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!answer) return;

    const letters = {};

    for (const str of [...answer]) {
      if (letters[str]) {
        letters[str] = +1;
        continue;
      }

      letters[str] = 1;
    }

    setLetterCounts(letters);
    setCorrectLetters(Array(answer.length).fill(''));
  }, [answer]);

  const compareInputWithAnswer = (input) => {
    if (input === answer) {
      console.log('정답');
    } else {
      console.log('오답');
    }

    const corrected = Array(answer.length).fill('');
    const newLetterCounts = { ...letterCounts };
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
      const inputString = input[i];
      const answerString = answer[i];

      if (inputString === answerString) {
        corrected[i] = answerString;
        continue;
      }

      if (newLetterCounts[inputString] > 0) {
        count++;
        newLetterCounts[inputString] -= 1;
      }
    }

    setCorrectLetters(corrected);

    if (count === 0) {
      setMessage('얼음속을 다시 들여다보세요');
    } else {
      setMessage(`정답과 ${count} 글자가 일치합니다`);
    }
  };

  return (
    <Container>
      <Header />
      <AnswerDisplayBox correctLetters={correctLetters} />
      <Message message={message} />
      <IcePlate />
      <InputBox compareWithAnswer={compareInputWithAnswer} />
      <Footer />
    </Container>
  );
}

export default Breaking;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.breakingBg};
`;
