import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('<Modal /> render', () => {
  const closeModal = jest.fn();

  function SampleComponent() {
    return <h1>Sample Heading</h1>;
  }

  it('renders children', () => {
    render(
      <Modal onClose={() => {}} dimmed="true" background="orange">
        Sample Test
      </Modal>,
    );

    expect(screen.getByText('Sample Test')).toBeInTheDocument();
  });

  it('renders component', () => {
    render(
      <Modal onClose={() => {}} dimmed="true" background="orange">
        <SampleComponent />
      </Modal>,
    );

    expect(screen.getByText('Sample Heading')).toBeInTheDocument();
  });

  it('execute onClose function when clicked dimmed or close button', () => {
    render(
      <Modal onClose={closeModal} dimmed="true" background="orange">
        <SampleComponent />
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('dimmed'));
    expect(closeModal.mock.calls.length).toBe(1);

    fireEvent.click(screen.getByRole('button'));
    expect(closeModal.mock.calls.length).toBe(2);
  });
});
