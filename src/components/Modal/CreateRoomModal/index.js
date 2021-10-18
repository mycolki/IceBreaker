import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDatabase, ref, set } from '@firebase/database';
import { saveRoomId, saveName } from '../../../store/battleSlice';
import { showMessage } from '../../../store/quizSlice';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { MODAL_TITLE, ROOMS, ROUTE } from '../../../constants/game';
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
  const questions = useSelector((state) => state.quiz?.questions);
  const name = useSelector((state) => state.battle?.name);
  const [title, setTitle] = useState(MODAL_TITLE.INPUT_HOST_NAME);
  const [input, setInput] = useState('');

  useEffect(() => {
    return () => {
      dispatch(saveRoomId(''));
      dispatch(showMessage(RESET));
    };
  }, [dispatch]);

  const enterRoom = (ev) => {
    ev.preventDefault();

    if (!name) return;

    const roomId = input;
    set(ref(getDatabase(), `${ROOMS}/${roomId}`), {
      questions,
      active: true,
      isAllReady: false,
      isPlaying: true,
      breakers: [
        {
          name,
          isReady: false,
          level: 1,
          score: 0,
          isWinner: false,
        },
        {
          name: '',
          isReady: false,
          level: 1,
          score: 0,
          isWinner: false,
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

    dispatch(saveName(input));
    window.sessionStorage.setItem(
      'userName',
      JSON.stringify({ userName: input }),
    );

    setInput(roomId);
    copyToClipboard(roomId);

    dispatch(saveRoomId(roomId));
    dispatch(showMessage(MAKE_ROOM.URL_COPIED));

    inputRef.current.setAttribute('readOnly', true);
    setTitle(MODAL_TITLE.PASS_ROOM_ID);
  };

  const handleInput = (ev) => setInput(ev.target.value.trim());

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
          autoFocus
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
