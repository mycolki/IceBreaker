import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import gsap from 'gsap';
import { MESSAGE } from '../../../styles/gsapStyle';

function Message() {
  const message = useSelector((state) => state.quiz?.message);

  useEffect(() => {
    if (!message) return;

    gsap.from(MESSAGE.TEXT, MESSAGE.FADE_IN);
    gsap.to(MESSAGE.TEXT, MESSAGE.FADE_OUT);
  }, [message]);

  return (
    <Wrapper>
      <Text isMessage={!!message} className="messageText">
        {message}
      </Text>
    </Wrapper>
  );
}

export default Message;

const Wrapper = styled.div`
  height: 5%;
  text-align: center;
`;

const Text = styled.p`
  height: 100%;
  font-size: 1em;
  font-family: 'Do Hyeon';
  line-height: 2.3em;
  background-color: ${({ theme, isMessage }) =>
    isMessage ? theme.deepBlue : 'transparent'};
  box-shadow: inset
    ${({ theme, isMessage }) => (isMessage ? theme.boxShadow : null)};
  color: ${({ theme }) => theme.white};
`;
