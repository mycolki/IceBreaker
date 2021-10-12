import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { showMessage } from '../../store/quizSlice';
import { getBattle } from '../../store/battleSlice';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { ROUTE } from '../../constants/game';
import { BATTLE, RESET } from '../../constants/messages';
import iceBear from '../../asset/iceBear.png';

import Message from '../share/Message';
import Button from '../share/Button';

function Room() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const breakers = useSelector((state) => state.battle?.breakers);

  useEffect(() => {
    dispatch(showMessage(BATTLE.PLEASE_READY));
    dispatch(getBattle(roomId));

    return () => {
      dispatch(showMessage(RESET));
    };
  }, [dispatch, roomId]);

  return (
    <Container>
      <RoomHeader>
        <h1 className="title">
          BREAKER <br />
          BATTLE
        </h1>
      </RoomHeader>
      <Message />
      <BattleGround>
        <div className="vs">VS</div>
        {breakers &&
          Object.values(breakers).map((breaker) => (
            <Battler>
              <span className="name">{breaker.name}지워야함</span>
              <img src={iceBear} alt="bear" width="160" height="auto" />
              <span className="ready">READY</span>
            </Battler>
          ))}
      </BattleGround>
      <RoomFooter>
        <Button text="READY" size="large" color="skyBlue" />
        <Link to={ROUTE.ROOMS}>
          <Button text="나가기" size="large" color="pink" />
        </Link>
      </RoomFooter>
    </Container>
  );
}

export default Room;

const BattleGround = styled.div`
  position: relative;
  height: 50%;
  padding-top: 30px;

  .vs {
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    color: ${({ theme }) => theme.deepBlue};
  }
`;

const Battler = styled.div`
  width: 50%;

  .name {
    display: block;
    font-family: 'Do hyeon';
    font-size: 20px;
    color: ${({ theme }) => theme.deepGray};
  }

  .ready {
    display: block;
    font-size: 18px;
    color: ${({ theme }) => theme.white};
  }

  &:first-child {
  }

  &:last-child {
    margin-left: 50%;
  }
`;

const RoomFooter = styled.div`
  ${flexCenterColumn}
  height: 25%;

  button {
    font-family: 'Do hyeon';
    margin-bottom: 15px;
  }
`;
