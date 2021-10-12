import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDatabase, ref, onValue } from 'firebase/database';
import { showMessage, onError } from '../../../store/quizSlice';
import { saveRoomData } from '../../../store/battleSlice';
import { ENTER_ROOM } from '../../../constants/messages';
import { ROUTE, ROOM } from '../../../constants/game';

import Message from '../../share/Message';
import Button from '../../share/Button';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';

function EnterRoomModal({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle?.rooms);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(
          ref(getDatabase(), ROOM),
          async (snapshot) => {
            const data = snapshot.val();

            if (!data) return;

            await dispatch(saveRoomData(data));
          },
          { onlyOnce: true },
        );
      } catch (err) {
        dispatch(onError(err.message));
        history.push(ROUTE.ERROR);
      }
    };

    fetchData();
  }, [dispatch, history]);

  const enterRoom = (ev) => {
    ev.preventDefault();

    if (roomId === 0) {
      return dispatch(showMessage(ENTER_ROOM.FILL_BLANK));
    }

    if (!rooms[roomId]) {
      setRoomId('');
      return dispatch(showMessage(ENTER_ROOM.INVALID_ID));
    }

    history.push(`${ROUTE.ROOM}/${roomId}`);
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputId = value.trim();
    setRoomId(inputId);
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title className="title">전달받은 방 ID를 입력해주세요</Title>
      <Form onSubmit={enterRoom}>
        <input
          className="input"
          type="number"
          pattern="[0-9]*"
          value={roomId}
          onChange={handleInput}
        />
        <div className="button-area">
          <Button
            text="뒤로가기"
            size="small"
            color="purple"
            onClick={closeModal}
          />
          <Button text="입장하기" type="submit" size="small" color="purple" />
        </div>
      </Form>
    </Container>
  );
}

export default EnterRoomModal;
