import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDatabase, ref, onValue, update } from 'firebase/database';
import { showMessage, onError } from '../../../store/quizSlice';
import { saveRoomData } from '../../../store/battleSlice';
import { ENTER_ROOM, RESET } from '../../../constants/messages';
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
  const [name, setName] = useState('');
  const [isRoom, setIsRoom] = useState(false);
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

    return () => dispatch(showMessage(RESET));
  }, [dispatch, history]);

  const enterRoom = async (ev) => {
    ev.preventDefault();

    if (name.length === 0) {
      setName('');
      return dispatch(showMessage(ENTER_ROOM.FILL_NAME));
    }

    const roomData = rooms[roomId];
    update(ref(getDatabase(), `${ROOM}/${roomId}`), {
      ...roomData,
      battler2: {
        name,
        score: 0,
      },
    });

    history.push(`${ROUTE.ROOM}/${roomId}`);
  };

  const checkRoomId = (ev) => {
    ev.preventDefault();

    if (roomId === 0) {
      return dispatch(showMessage(ENTER_ROOM.FILL_BLANK));
    }

    if (!rooms[roomId]) {
      setRoomId('');
      return dispatch(showMessage(ENTER_ROOM.INVALID_ID));
    }

    setIsRoom(true);
    setName('');
  };

  const handleNameInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();
    setName(inputValue);
  };

  const handleRoomIdInput = ({ target }) => {
    const { value } = target;
    const inputId = value.trim();
    setRoomId(inputId);
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title className="title">
        {isRoom
          ? '입장할 닉네임을 입력해주세요'
          : '전달받은 방 ID를 입력해주세요'}
      </Title>
      <Form onSubmit={isRoom ? enterRoom : checkRoomId}>
        {isRoom ? (
          <input
            className="input"
            type="text"
            value={name}
            onChange={handleNameInput}
          />
        ) : (
          <input
            className="input"
            type="number"
            pattern="[0-9]*"
            value={roomId}
            onChange={handleRoomIdInput}
          />
        )}

        <div className="button-area">
          <Button
            text="뒤로가기"
            size="small"
            color="purple"
            onClick={closeModal}
          />
          {isRoom ? (
            <Button text="입장하기" type="submit" size="small" color="purple" />
          ) : (
            <Button text="ID확인" type="submit" size="small" color="purple" />
          )}
        </div>
      </Form>
    </Container>
  );
}

export default EnterRoomModal;
