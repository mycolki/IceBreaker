import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { showMessage } from '../../../store/quizSlice';
import { ENTER_ROOM } from '../../../constants/messages';

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
  const inputRef = useRef();

  const enterRoom = (ev) => {
    ev.preventDefault();

    //유효하지 않은 id
    showMessage(dispatch(ENTER_ROOM.INVALID_ID));
    inputRef.current.value = '';
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title className="title">전달받은 방 ID를 입력해주세요</Title>
      <Form onSubmit={enterRoom}>
        <input className="input" type="text" ref={inputRef} />
        <div className="button-area">
          <Button size="small" color="purple" onClick={closeModal}>
            뒤로가기
          </Button>
          <Button type="submit" size="small" color="purple">
            들어가기
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default EnterRoomModal;
