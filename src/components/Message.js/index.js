import styled from 'styled-components';

function Message({ message }) {
  return <Wrapper>{message}</Wrapper>;
}

export default Message;

const Wrapper = styled.div`
  height: 5%;
  text-align: center;
  font-family: 'Do Hyeon';
  font-size: 1em;
  line-height: 2.3em;
  background-color: ${({ theme }) => theme.deepBlue};
  color: ${({ theme }) => theme.white};
  box-shadow: inset ${({ theme }) => theme.boxShadow};
`;
