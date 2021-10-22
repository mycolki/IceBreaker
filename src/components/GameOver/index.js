import { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSound from 'use-sound';

import { showMessage, resetScore, takeHint } from '../../store/quizSlice';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { detectWebp } from '../../utils/detectWebp';
import { ROUTE } from '../../constants/game';
import { RESET, GAME } from '../../constants/messages';

import Button from '../share/Button';
import Message from '../share/Message';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

const Portal = lazy(() => import('../Portal'));
const Modal = lazy(() => import('../Modal'));
const RegisterRankModal = lazy(() => import('../Modal/RegisterRankModal'));

function GameOver() {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz?.score);
  const isWin = score ? score === 500 : null;
  const [rankModalOpen, setRankModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasRank, setHasRank] = useState(false);
  const [play] = useSound('/audio/click.mp3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(
    typeof Audio !== 'undefined' &&
      new Audio(score >= 140 ? '/audio/won.mp3' : '/audio/lost.mp3'),
  );

  useEffect(() => {
    setLoading(true);
    setIsPlaying(true);

    return () => {
      dispatch(resetScore());
      dispatch(showMessage(RESET));
      dispatch(takeHint(5));
      audio.pause();
    };
  }, [score]);

  useEffect(() => {
    if (isPlaying) audio.play();
  }, [isPlaying]);

  const shareGameURL = () => {
    copyToClipboard('https://icebreaker.colki.me');
    dispatch(showMessage(GAME.SHARE));
    play();
  };

  const openRankModal = () => {
    setRankModalOpen(true);
    play();
  };

  const closeRankModal = () => {
    setRankModalOpen(false);
    dispatch(showMessage(RESET));
    play();
  };

  return (
    <Container isWin={isWin} isWebp={detectWebp()}>
      <TitleWrapper isWin={isWin}>
        <h1 className="title">GAME OVER</h1>
        {loading ? <h2 className="score">{score}</h2> : <BarSpinner />}
      </TitleWrapper>
      <Buttons>
        <li className="button">
          <Button
            text="공유하기"
            size="large"
            color="pink"
            onClick={shareGameURL}
          />
        </li>
        <li className="button">
          <Button
            text="랭킹 등록"
            size="large"
            color="purple"
            onClick={openRankModal}
            disabled={hasRank}
          />
          {rankModalOpen && (
            <Suspense fallback={null}>
              <Portal>
                <Modal onClose={closeRankModal} dimmed={true}>
                  <RegisterRankModal
                    onClose={closeRankModal}
                    hasRank={setHasRank}
                  />
                </Modal>
              </Portal>
            </Suspense>
          )}
        </li>
        <li className="button">
          <Link to={ROUTE.MENU}>
            <Button text="처음으로" size="large" color="skyBlue" />
          </Link>
        </li>
      </Buttons>
      <Message />
    </Container>
  );
}

export default GameOver;

const Container = styled.div`
  height: 100%;
  background-image: ${({ isWebp }) =>
    isWebp ? 'url(/background/solo.webp)' : 'url(/background/solo.png)'};
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 65%;
  text-align: center;

  .title {
    margin: auto;
    padding-top: 100px;
    font-family: 'Do hyeon';
    font-size: 55px;
    color: ${({ theme }) => theme.white};
    -webkit-text-stroke: 2px ${({ theme }) => theme.white};
  }

  .score {
    position: absolute;
    top: 75%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 60px;
    color: ${({ theme }) => theme.red};
    -webkit-text-stroke: 2px ${({ theme }) => theme.red};
    transform: translate(-50%, -50%);
  }
`;

const Buttons = styled.ul`
  height: 30%;
  text-align: center;

  .button {
    margin-bottom: 0.7em;
  }
`;
