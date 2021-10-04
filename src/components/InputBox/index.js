import styled from 'styled-components';

function InputBox() {
  return <Wrapper>InputBox</Wrapper>;
}

export default InputBox;

const Wrapper = styled.div`
  height: 12.5%;
  background-color: ${({ theme }) => theme.skyBlue};
`;
