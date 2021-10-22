import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDatabase, ref, get, child, update } from 'firebase/database';
import { showMessage, onError } from '../../../store/quizSlice';
import { saveRoomId } from '../../../store/battleSlice';
import { ENTER_ROOM, RESET } from '../../../constants/messages';
import { ROUTE, ROOMS } from '../../../constants/game';
import { ERROR } from '../../../constants/error';

import Message from '../../share/Message';
import Button from '../../share/Button';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';

function EnterRoomModal({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle?.rooms);
  const roomId = useSelector((state) => state.battle?.roomId);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    return () => dispatch(showMessage(RESET));
  }, [dispatch, history]);

  const enterRoom = async (ev) => {
    ev.preventDefault();

    if (name.length === 0) {
      setName('');
      return dispatch(showMessage(ENTER_ROOM.FILL_NAME));
    }

    try {
      const snapshot = await get(
        child(ref(getDatabase()), `${ROOMS}/${roomId}/breakers/0/name`),
      );

      if (snapshot.val() === name) {
        setName('');
        return dispatch(showMessage(ENTER_ROOM.EXIST_NAME));
      }
    } catch (err) {
      dispatch(onError(ERROR.LOAD_DATA));
      history.push(ROUTE.ERROR);
    }

    window.sessionStorage.setItem(
      'userName',
      JSON.stringify({ userName: name }),
    );

    update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers`), {
      1: { name, isReady: false, level: 1, score: 0, isWinner: false },
    });

    history.push(`${ROUTE.ROOM}/${roomId}`);
  };

  const checkRoomId = (ev) => {
    ev.preventDefault();

    if (input === 0) {
      return dispatch(showMessage(ENTER_ROOM.FILL_BLANK));
    }

    if (!rooms[input]) {
      setInput('');
      return dispatch(showMessage(ENTER_ROOM.INVALID_ID));
    }

    dispatch(saveRoomId(input));
    setInput('');
  };

  const handleNameInput = (ev) => setName(ev.target.value.trim());
  const handleRoomIdInput = (ev) => setInput(ev.target.value.trim());

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title className="title">
        {roomId
          ? '입장할 닉네임을 입력해주세요'
          : '전달받은 방 ID를 입력해주세요'}
      </Title>
      <Form onSubmit={roomId ? enterRoom : checkRoomId}>
        <input
          className="input"
          type={roomId ? 'text' : 'number'}
          value={roomId ? name : input}
          pattern={roomId ? null : '[0-9]*'}
          onChange={roomId ? handleNameInput : handleRoomIdInput}
          maxLength={roomId ? '7' : null}
          autoFocus
        />
        <div className="button-area">
          <Button
            text="뒤로가기"
            size="small"
            color="purple"
            onClick={onClose}
          />
          <Button
            text={roomId ? '입장하기' : 'ID확인'}
            type="submit"
            size="small"
            color="purple"
          />
        </div>
      </Form>
    </Container>
  );
}

export default EnterRoomModal;
