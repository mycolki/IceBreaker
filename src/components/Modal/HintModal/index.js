import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import hintCokeWeb from '../../../asset/hintCoke.webp';
import hintCoke from '../../../asset/hintCoke.png';

import { useHint } from '../../../store/quizSlice';
import { rightAndLeft } from '../../../styles/share/animation';

import Message from '../../share/Message';
import ImgWithFallback from '../../ImgWithFallback';
import { flexCenter } from '../../../styles/share/common';

function HintModal({ onClose }) {
  const dispatch = useDispatch();

  const useHint1Coke = () => {
    dispatch(useHint(1));
    onClose();
  };

  const useHint2Coke = () => {
    dispatch(useHint(2));
    onClose();
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Hint>
        <div className="cokes">
          <ImgWithFallback
            src={hintCokeWeb}
            fallback={hintCoke}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useHint1Coke}
          />
        </div>
        <span className="hint-comment">정답 맞추는 시간 +10초</span>
      </Hint>
      <Hint>
        <div className="cokes">
          <ImgWithFallback
            src={hintCokeWeb}
            fallback={hintCoke}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useHint2Coke}
          />
          <ImgWithFallback
            src={hintCokeWeb}
            fallback={hintCoke}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useHint2Coke}
          />
        </div>
        <span className="hint-comment">상대브레이커 시간 -5초</span>
      </Hint>
    </Container>
  );
}

export default HintModal;

const Container = styled.div`
  height: 100%;
  font-family: 'Do Hyeon';
  text-align: center;
`;

const MessageArea = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 26%;
`;

const Hint = styled.div`
  ${flexCenter}
  height: 37%;
  padding: 0 15px;

  .cokes {
    ${flexCenter}
    display: flex;
    text-align: center;
    width: 40%;

    img {
      transform: rotate(20deg);
      animation: ${rightAndLeft} 1.1s infinite ease-in;
    }
  }

  .hint-comment {
    width: 60%;
    font-size: 18px;
    color: ${({ theme }) => theme.white};
  }
`;
