import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Room() {
  const { roomId } = useParams();
  return (
    <Container>
      <h1>{roomId}</h1>
    </Container>
  );
}

export default Room;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.roomBg};
`;
