import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin.js';

import theme from '../../styles/theme';

gsap.registerPlugin(TextPlugin);

function Ready() {
  const [second, setSecond] = useState(3);
  const history = useHistory();

  useEffect(() => {
    if (second === 3) {
      gsap.from('.circle', {
        duration: 1,
        background: theme.redCircleBg,
      });
    } else if (second === 2) {
      gsap.to('.circle', {
        duration: 1,
        background: theme.greenCircleBg,
      });

      gsap.to('.circle', {
        duration: 0.4,
        scale: 1.5,
      });
    } else if (second === 1) {
      gsap.to('.circle', {
        duration: 1,
        background: 'transparent',
      });

      gsap.to('.background', {
        background: theme.yellowCircleBg,
      });

      gsap.to('.circle', {
        duration: 2,
        scale: 20,
        opacity: 0,
      });
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
