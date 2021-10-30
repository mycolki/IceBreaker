import React from 'react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

import { ROUTE } from '../../constants/game';
import ErrorBox from '../ErrorBox';

describe('<ErrorBox /> : render', () => {
  const history = createMemoryHistory();

  it('should render error message', () => {
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

  it('should be rendered menu when clicked button', () => {
    render(
      <Router history={history}>
        <ErrorBox />
      </Router>,
    );

    const menu = screen.getByText('메뉴로 돌아가기');

    expect(menu.closest('a')).toHaveAttribute('href', ROUTE.MENU);
  });
});
