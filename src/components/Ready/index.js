import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin.js';
import { getDatabase, ref, onValue } from 'firebase/database';

import {
  replaceQuestions,
  getFirstLevel,
  onError,
} from '../../store/quizSlice';
import { saveName, saveId, saveBreakers } from '../../store/battleSlice';
import { ROUTE, ROOM } from '../../constants/game';
import { ERROR } from '../../constants/error';
import { READY } from '../../styles/gsapStyle';
import { flexCenterColumn } from '../../styles/share/common';

gsap.registerPlugin(TextPlugin);

function Ready() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector((state) => state.battle?.name);
  const breakers = useSelector((state) => state.battle?.breakers);
  const [second, setSecond] = useState(3);

  useEffect(() => {
    if (!roomId) return dispatch(getFirstLevel());

    return onValue(ref(getDatabase(), `${ROOM}/${roomId}`), (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      dispatch(replaceQuestions(data.questions));
      dispatch(saveBreakers(data.breakers));
      dispatch(getFirstLevel());
    });
  }, [dispatch, roomId]);

  useEffect(() => {
    if (!name || !breakers) return;

    const eachBreakerId = {};

    breakers.forEach((breaker, index) => {
      breaker.name === name
        ? (eachBreakerId.id = index)
        : (eachBreakerId.opponentId = index);
    });

    dispatch(saveId(eachBreakerId));
  }, [dispatch, name, breakers]);

  useEffect(() => {
    if (!roomId) return;

    try {
      const { userName } = JSON.parse(
        window.sessionStorage.getItem('userName'),
      );
      dispatch(saveName(userName));
    } catch (err) {
      dispatch(onError(ERROR.LOAD_DATA));
      history.push(ROUTE.ERROR);
    }
  }, [dispatch]);

  useEffect(() => {
    let timer;

    const waitForOneSecond = () => {
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(), 1000);
      });
    };

    (async () => {
      if (second === 0) {
        roomId
          ? history.push(`${ROUTE.BREAKING}/${roomId}`)
          : history.push(ROUTE.BREAKING);
      }

      try {
        await waitForOneSecond();
        setSecond((prev) => prev - 1);
      } catch (err) {
        dispatch(onError(ERROR.UNKNOWN));
        history.push(ROUTE.ERROR);
      }
    })();

    return () => clearTimeout(timer);
  }, [history, second]);

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
  background-image: url(/background/readyBg.png);
  background-size: 375px 713px;

  .circle {
    ${flexCenterColumn}
    position: absolute;
    top: 50%;
    left: 50%;
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
