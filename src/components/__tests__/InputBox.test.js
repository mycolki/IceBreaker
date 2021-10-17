import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as reducers from '../../store/quizSlice';
import InputBox from '../InputBox';

describe('<InputBox /> : render form', () => {
  it('should render form of InputBox', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: true,
        },
      }),
    );

    render(<InputBox />);

    expect(screen.getByPlaceholderText('Guess What')).toBeInTheDocument();
  });

  it('should not render form of InputBox', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: false,
        },
      }),
    );

    const { container } = render(<InputBox />);

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});

describe('<InputBox /> : toggle submit', () => {
  it('should disable submit button if image is not rendered ', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: true,
          isImageLoaded: true,
        },
      }),
    );

    render(<InputBox />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should able submit button if image is rendered ', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: true,
          isImageLoaded: false,
        },
      }),
    );

    render(<InputBox />);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});

describe('<InputBox /> : submit input value', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  it('should reset value of input if submitted value is same with answer', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: true,
          isImageLoaded: true,
          currentQuestion: {
            answer: '바나나',
          },
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: {
        value: '바나나',
      },
    });

    fireEvent.submit(form);
    expect(input).toHaveAttribute('value', '');

    store.dispatch(reducers.addScore());
    store.dispatch(reducers.showAnswerBoxByInput('바나나'));
    store.dispatch(reducers.toggleAnswer(true));
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/addScore');
    expect(actions[1].type).toEqual('quiz/showAnswerBoxByInput');
    expect(actions[2].type).toEqual('quiz/toggleAnswer');
  });

  it('should reset value of input if submitted value is not korean', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: true,
          isImageLoaded: true,
          currentQuestion: {
            answer: '바나나',
          },
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: {
        value: '',
      },
    });

    fireEvent.submit(form);
    expect(input).toHaveAttribute('value', '');

    store.dispatch(reducers.showMessage('Not Korean'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/addScore');

    store.clearActions();
  });

  it('should reset value of input if submitted value is all wrong ', () => {
    useDispatch.mockImplementation(() => function dispatch() {});
    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          isNotBreaking: true,
          isImageLoaded: true,
          currentQuestion: {
            answer: '바나나',
          },
        },
      }),
    );
    render(<InputBox />);

    const input = screen.getByPlaceholderText('Guess What');
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: {
        value: '복숭아',
      },
    });

    fireEvent.submit(form);

    store.dispatch(reducers.showMessage('All Wrong!'));
    store.dispatch(reducers.showAnswerBoxByInput('복숭아'));
    const actions = store.getActions();

    expect(actions[0].type).toEqual('quiz/showMessage');
    expect(actions[1].type).toEqual('quiz/showAnswerBoxByInput');
    expect(input).toHaveAttribute('value', '');

    store.clearActions();
  });
});
