import styled from 'styled-components';
import Button from '../share/Button';

function Menu() {
  return (
    <Container>
      <TitleWrapper>
        <h1 className="app-title">
          ICE <br />
          BREAKER
        </h1>
      </TitleWrapper>
      <MenuButtons>
        <li className="button">
          <Button size="large" color="skyBlue">
            얼음깨기
          </Button>
        </li>
        <li className="button">
          <Button size="large" color="skyBlue">
            처음으로
          </Button>
        </li>
        <li className="button">
          <Button size="large" color="skyBlue">
            친구의 얼음깨기
          </Button>
        </li>
        <li className="button">
          <Button size="large" color="skyBlue">
            얼음 얼리기
          </Button>
        </li>
        <li className="button">
          <Button size="large" color="purple">
            랭킹보기
          </Button>
        </li>
        <li className="button">
          <Button size="large" color="purple">
            게임 방법
          </Button>
        </li>
      </MenuButtons>
    </Container>
  );
}

export default Menu;

const Container = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.mainSkyBlueBg};
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 45%;
  text-align: center;

  .app-title {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    line-height: 1.6em;
    font-size: 2em;
    color: white;
    -webkit-text-stroke: 2px ${({ theme }) => theme.deepBlue};
    transform: translate(-50%, -50%);
  }
`;

const MenuButtons = styled.ul`
  height: 55%;
  text-align: center;

  .button {
    margin-top: 0.7em;
  }
`;
