import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';

import { ROUTE } from '../../constants/game';
import Menu from '../Menu';

describe('<Menu /> : render', () => {
  it('should render app menu component', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Menu />
      </Router>,
    );

    expect(screen.getByText('ICE BREAKER')).toBeInTheDocument();
  });

  it('should be rendered each component when clicked button', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Menu />
      </Router>,
    );

    const soloStart = screen.getByText('혼자 얼음깨기');
    expect(soloStart.closest('a')).toHaveAttribute('href', ROUTE.READY);

    const battleStart = screen.getByText('같이 얼음깨기');
    expect(battleStart.closest('a')).toHaveAttribute('href', ROUTE.ROOMS);
  });
});
