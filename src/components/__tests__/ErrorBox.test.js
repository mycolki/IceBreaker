import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

import { ROUTE } from '../../constants/game';
import ErrorBox from '../ErrorBox';

describe('<ErrorBox /> : render', () => {
  const history = createMemoryHistory();
  const MOCK_ERROR_MESSAGE = '에러가 발생했습니다';
  history.push(ROUTE.ERROR, {
    error: MOCK_ERROR_MESSAGE,
  });

  it('should render error message', () => {
    render(
      <Router history={history}>
        <ErrorBox />
      </Router>,
    );

    expect(screen.getByText(`🙈${MOCK_ERROR_MESSAGE}`)).toBeInTheDocument();
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
