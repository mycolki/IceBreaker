import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getDatabase, ref, get, set, child } from '@firebase/database';
import { onError, showMessage } from '../../../store/quizSlice';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';
import { ROUTE, RANKERS } from '../../../constants/game';
import { GAME } from '../../../constants/messages';
import { ERROR } from '../../../constants/error';

import Message from '../../share/Message';
import Button from '../../share/Button';

function ResisterRankModal({ onClose, hasRank }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const score = useSelector((state) => state.quiz?.score);
  const [name, setName] = useState('');

  const close = () => {
    setName('');
    onClose();
  };

  const submitName = async (ev) => {
    ev.preventDefault();

    if (!name) {
      dispatch(showMessage(GAME.FILL_BLANK));
      return setName('');
    }

    try {
      const snapshot = await get(
        child(ref(getDatabase()), `${RANKERS}/${name}`),
      );

      if (snapshot.val() !== null) {
        dispatch(showMessage(GAME.EXIST_RANK));
        return setName('');
      }
    } catch (err) {
      dispatch(onError(ERROR.LOAD_DATA));
      history.push(ROUTE.ERROR);
    }

    set(ref(getDatabase(), `${RANKERS}/${name}`), {
      name,
      score,
    });

    hasRank(true);
    close();
  };

  const handleInput = (ev) => setName(ev.target.value.trim());

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title>랭킹에 등록할 이름을 등록해주세요</Title>
      <Form onSubmit={submitName}>
        <input
          className="input"
          type="text"
          maxLength="7"
          value={name}
          onChange={handleInput}
          autoFocus
        />
        <div className="button-area">
          <Button text="뒤로가기" size="small" color="purple" onClick={close} />
          <Button text="등록하기" type="submit" size="small" color="purple" />
        </div>
      </Form>
    </Container>
  );
}

export default ResisterRankModal;
