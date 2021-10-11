import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { getDatabase, ref, set } from '@firebase/database';

import { showMessage } from '../../../store/quizSlice';
import { copyToClipboard } from '../../../utils/copyToClipboard';
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
  const [title, setTitle] = useState('방에 참가할 닉네임을 입력해주세요');
  const [isRoom, setIsRoom] = useState(false);
  const [name, setName] = useState('');

  const makeRoom = (ev) => {
    ev.preventDefault();

    if (name.length === 0) {
      setName('');
      return dispatch(showMessage(MAKE_ROOM.FILL_BLANK));
    }

    const roomId = Date.now();
    copyToClipboard(roomId);
    setName(roomId);
    setIsRoom(true);

    dispatch(showMessage(MAKE_ROOM.URL_COPIED));
    inputRef.current.setAttribute('readOnly', true);
    setTitle('친구에게 방ID를 전달해주세요😀');

    set(ref(getDatabase(), `room/${roomId}`), {
      host: name,
    });
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputValue = value.trim();
    setName(inputValue);
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title className="title">{title}</Title>
      <Form onSubmit={makeRoom}>
        <input
          className="input"
          type="text"
          value={name}
          onChange={handleInput}
          ref={inputRef}
        />
        <div className="button-area">
          <Button size="small" color="purple" onClick={closeModal}>
            {!isRoom ? '뒤로 가기' : '메뉴로 돌아가기'}
          </Button>
          {!isRoom && (
            <Button type="submit" size="small" color="purple">
              방 만들기
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
}

export default CreateRoomModal;
