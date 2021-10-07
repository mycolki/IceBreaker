import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin.js';
import { READY } from '../../styles/gsapStyle';

gsap.registerPlugin(TextPlugin);

function Ready() {
  const [second, setSecond] = useState(3);
  const history = useHistory();

  useEffect(() => {
    if (second === 3) {
      gsap.from(READY.CIRCLE, READY.RED_CIRCLE);
    } else if (second === 2) {
      gsap.to(READY.CIRCLE, READY.GREEN_CIRCLE);
      gsap.to(READY.CIRCLE, READY.SCALE_UP_FROM_GREEN);
    } else if (second === 1) {
      gsap.to(READY.CIRCLE, READY.TRANSPARENT_FROM_GREEN);
      gsap.to(READY.BACKGROUND, READY.YELLOW_CIRCLE);
      gsap.to(READY.CIRCLE, READY.SCALE_UP_FROM_YELLOW);
    }
  }, [second]);

  useEffect(() => {
    let timer;

    if (second > 0) {
      timer = setTimeout(() => {
        setSecond((prev) => prev - 1);
      }, 1000);
    } else {
      history.push('/game/breaking');
    }

    return () => clearTimeout(timer);
  }, [history, second]);

  return (
    <Container className="background">
      <div className="circle">
        <span className="ready">READY</span>
        <span className="second">{second}</span>
      </div>
    </Container>
  );
}

export default Ready;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.readyGameBg};

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.redCircleBg};
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.79);
    color: ${({ theme }) => theme.white};

    .ready,
    .second {
      display: block;
    }

    .ready {
      font-size: 1.8em;
      line-height: 1.8em;
    }

    .second {
      font-size: 4em;
    }
  }
`;
