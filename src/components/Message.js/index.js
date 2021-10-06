import styled from 'styled-components';

function Message({ message }) {
  const isMessage = !!message;
  return <Wrapper isMessage={isMessage}>{message}</Wrapper>;
}

export default Message;

const Wrapper = styled.div`
  height: 5%;
  text-align: center;
  font-family: 'Do Hyeon';
  font-size: 1em;
  line-height: 2.3em;
  background-color: ${({ theme, isMessage }) =>
    isMessage ? theme.deepBlue : 'transparent'};
  color: ${({ theme }) => theme.white};
  box-shadow: inset
    ${({ theme, isMessage }) => (isMessage ? theme.boxShadow : null)};
`;
