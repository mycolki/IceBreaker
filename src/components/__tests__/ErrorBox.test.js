import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

import ErrorBox from '../ErrorBox';

describe('<ErrorBox /> : render', () => {
  it('should render error message', () => {
    const history = createMemoryHistory();
    const MOCK_ERR_MESSAGE = '에러가 발생했습니다';

    useSelector.mockImplementation((selector) =>
      selector({
        quiz: {
          error: MOCK_ERR_MESSAGE,
        },
      }),
    );

    render(
      <Router history={history}>
        <ErrorBox />
      </Router>,
    );

    expect(screen.getByText(`🙈${MOCK_ERR_MESSAGE}`)).toBeInTheDocument();
  });
});
