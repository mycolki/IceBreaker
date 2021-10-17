import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputBox from '../InputBox';

import { useSelector } from 'react-redux';

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
