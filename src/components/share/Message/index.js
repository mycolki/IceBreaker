import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import theme from '../../../styles/theme';

const STYLES = {
  break: css`
    background-color: ${theme.purple};
  `,
  answer: css`
    background-color: ${theme.deepPink};
  `,
  validationInput: css`
    background-color: ${theme.deepBlue};
  `,
  validationAnswer: css`
    background-color: ${theme.deepGray};
  `,
};

function Message() {
  const type = useSelector((state) => state.quiz?.message?.type);
  const text = useSelector((state) => state.quiz?.message?.text);
  const messageStyle = type ? STYLES[type] : null;

  return (
    <Wrapper>
      <Text isMessage={!!text} className="text" messageStyle={messageStyle}>
        {text}
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
  /* background-color: ${({ theme, isMessage }) =>
    isMessage ? theme.deepBlue : 'transparent'}; */
  box-shadow: inset
    ${({ theme, isMessage }) => (isMessage ? theme.boxShadow : null)};
  color: ${({ theme }) => theme.white};

  ${({ messageStyle }) => messageStyle};
`;
