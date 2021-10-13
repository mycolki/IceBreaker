import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDatabase, ref, set } from '@firebase/database';
import { saveRoomId } from '../../../store/battleSlice';
import { showMessage } from '../../../store/quizSlice';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { MODAL_TITLE, ROOM, ROUTE } from '../../../constants/game';
import { MAKE_ROOM, RESET } from '../../../constants/messages';

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
  const history = useHistory();
  const inputRef = useRef();
  const roomId = useSelector((state) => state.battle?.roomId);
  const [title, setTitle] = useState(MODAL_TITLE.INPUT_HOST_NAME);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    return () => {
      dispatch(saveRoomId(''));
      dispatch(showMessage(RESET));
    };
  }, [dispatch]);

  const enterRoom = (ev) => {
    ev.preventDefault();

    const roomId = input;
    window.sessionStorage.setItem(
      'userName',
      JSON.stringify({ userName: name }),
    );
    set(ref(getDatabase(), `${ROOM}/${roomId}`), {
      active: true,
      isAllReady: false,
      breakers: [
        {
          name,
          score: 0,
          isReady: false,
        },
        {
          name: '',
          score: 0,
          isReady: false,
        },
      ],
    });

    history.push(`${ROUTE.ROOM}/${roomId}`);
  };

  const makeRoom = (ev) => {
    ev.preventDefault();

    if (input.length === 0) {
      setInput('');
      return dispatch(showMessage(MAKE_ROOM.FILL_BLANK));
    }

    const roomId = Date.now();
    setName(input);
    setInput(roomId);
    copyToClipboard(roomId);

    dispatch(saveRoomId(roomId));
    dispatch(showMessage(MAKE_ROOM.URL_COPIED));

    inputRef.current.setAttribute('readOnly', true);
    setTitle(MODAL_TITLE.PASS_ROOM_ID);
  };

  const handleInput = (ev) => {
    setInput(ev.target.value.trim());
  };

  return (
    <Container>
      <MessageArea>
        <Message height="10" />
      </MessageArea>
      <Title className="title">{title}</Title>
      <Form onSubmit={roomId ? enterRoom : makeRoom}>
        <input
          className="input"
          type="text"
          value={input}
          onChange={handleInput}
          ref={inputRef}
          maxLength={roomId ? null : '7'}
        />
        <div className="button-area">
          <Button
            text={roomId ? '방 삭제하기' : '뒤로 가기'}
            size="small"
            color="purple"
            onClick={closeModal}
          />
          <Button
            text={roomId ? '입장하기' : '방 만들기'}
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
