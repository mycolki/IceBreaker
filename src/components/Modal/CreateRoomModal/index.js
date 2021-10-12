import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDatabase, ref, set } from '@firebase/database';

import { createRoom, saveRoomId } from '../../../store/battleSlice';
import { showMessage } from '../../../store/quizSlice';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { MODAL_TITLE, ROOM } from '../../../constants/game';
import { MAKE_ROOM } from '../../../constants/messages';

import Message from '../../share/Message';
import Button from '../../share/Button';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';

function CreateRoomModal({ closeModal }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const isRoom = useSelector((state) => state.battle?.isRoom);
  const [title, setTitle] = useState(MODAL_TITLE.INPUT_HOST_NAME);
  const [input, setInput] = useState('');

  useEffect(() => {
    return () => {
      dispatch(createRoom(false));
      dispatch(saveRoomId(''));
    };
  }, [dispatch]);

  const makeRoom = (ev) => {
    ev.preventDefault();

    if (input.length === 0) {
      setInput('');
      return dispatch(showMessage(MAKE_ROOM.FILL_BLANK));
    }

    const roomId = Date.now();
    copyToClipboard(roomId);
    setInput(roomId);

    dispatch(saveRoomId(roomId));
    dispatch(createRoom(true));
    dispatch(showMessage(MAKE_ROOM.URL_COPIED));

    inputRef.current.setAttribute('readOnly', true);
    setTitle(MODAL_TITLE.PASS_ROOM_ID);
    set(ref(getDatabase(), `${ROOM}/${roomId}`), {
      id: roomId,
      host: input,
    });
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();
    setInput(inputValue);
  };

  return (
    <Container>
      <MessageArea>
        <Message height="10" />
      </MessageArea>
      <Title className="title">{title}</Title>
      <Form onSubmit={makeRoom}>
        <input
          className="input"
          type="text"
          value={input}
          onChange={handleInput}
          ref={inputRef}
        />
        <div className="button-area">
          <Button
            text={isRoom ? '방 삭제하기' : '뒤로 가기'}
            size="small"
            color="purple"
            onClick={closeModal}
          />
          <Button
            text={isRoom ? '입장하기' : '방 만들기'}
            type="submit"
            size="small"
            color="purple"
          />
        </div>
      </Form>
    </Container>
  );
}

export default CreateRoomModal;
