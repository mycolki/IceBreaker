import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDatabase, ref, onValue } from 'firebase/database';

import { showMessage } from '../../../store/quizSlice';
import { saveRoomData } from '../../../store/battleSlice';
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
  const players = useSelector((state) => state.battle?.players);
  const [inputId, setInputId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      onValue(
        ref(getDatabase(), 'room'),
        async (snapshot) => {
          try {
            if (!snapshot.exists()) {
              throw Error('게임에 필요한 데이터를 받아오지 못했습니다');
            }

            const data = snapshot.val();
            await dispatch(saveRoomData(data));
          } catch (err) {
            console.error(err);
          }
        },
        { onlyOnce: true },
      );
    };

    fetchData();
  }, [dispatch]);

  const enterRoom = (ev) => {
    ev.preventDefault();

    if (inputId === 0) {
      return dispatch(showMessage(ENTER_ROOM.FILL_BLANK));
    }

    if (!players[inputId]) {
      setInputId('');
      return dispatch(showMessage(ENTER_ROOM.INVALID_ID));
    }
  };

  const handleInput = ({ target }) => {
    const { value } = target;
    const inputId = value.trim();
    setInputId(inputId);
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
          value={inputId}
          onChange={handleInput}
        />
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
