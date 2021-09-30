import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const SIZE_PRESET = {
  small: css`
    width: 80px;
    height: 55px;
  `,
  medium: css`
    width: 120px;
    height: 55px;
  `,
  large: css`
    width: 190px;
    height: 40px;
    font-size: 1.3em;
    line-height: 0.8em;
  `,
};

const COLOR_PRESET = {
  skyBlue: css`
    background-color: ${({ theme }) => theme.skyBlue};
    border: ${({ theme }) => theme.buttonBorder};
  `,
  purple: css`
    background-color: ${({ theme }) => theme.purple};
    border: ${({ theme }) => theme.buttonBorder};
  `,
  pink: css`
    background-color: ${({ theme }) => theme.pink};
    border: ${({ theme }) => theme.buttonBorder};
  `,
  lightPurple: css`
    background-color: ${({ theme }) => theme.lightPurple};
  `,
};

function Button({ children, type, disabled, size, color }) {
  const sizePreset = SIZE_PRESET[size];
  const colorPreset = COLOR_PRESET[color];

  return (
    <StyledButton
      type={type}
      disabled={disabled}
      sizePreset={sizePreset}
      colorPreset={colorPreset}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

const StyledButton = styled.button`
  margin: 0;
  padding: 10px 20px;
  outline: none;
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.white};
  transition: all 200ms ease-in;

  ${({ sizePreset }) => sizePreset}
  ${({ colorPreset }) => colorPreset}

  &:active,
  &:hover,
  &:focus {
    opacity: 0.9;
    transform: scaleX(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;