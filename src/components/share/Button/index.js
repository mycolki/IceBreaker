import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const SIZE_PRESET = {
  small: css`
    min-width: 70px;
    height: 50px;
    font-size: 13px;
  `,
  medium: css`
    min-width: 130px;
    height: 55px;
    font-size: 22px;
  `,
  large: css`
    min-width: 190px;
    height: 40px;
    font-size: 20px;
    line-height: 16px;
    border: ${({ theme }) => theme.buttonBorder};
  `,
};

const COLOR_PRESET = {
  transparent: css`
    background-color: transparent;
    box-shadow: none;
  `,
  skyBlue: css`
    background-color: ${({ theme }) => theme.skyBlue};
  `,
  purple: css`
    background-color: ${({ theme }) => theme.purple};
  `,
  pink: css`
    background-color: ${({ theme }) => theme.pink};
  `,
  lightPurple: css`
    background-color: ${({ theme }) => theme.lightPurple};
  `,
};

function Button({ children, type, disabled, size, color, onClick }) {
  const sizePreset = SIZE_PRESET[size];
  const colorPreset = COLOR_PRESET[color];

  return (
    <StyledButton
      className="styled-button"
      type={type}
      disabled={disabled}
      sizePreset={sizePreset}
      colorPreset={colorPreset}
      onClick={onClick}
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
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  color: 'transparent',
};

const StyledButton = styled.button`
  margin: 0;
  padding: 10px 15px;
  outline: none;
  cursor: pointer;
  text-align: center;
  border: none;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.white};
  transition: all 100ms ease-out;

  ${({ sizePreset }) => sizePreset}
  ${({ colorPreset }) => colorPreset}

  &:active,
  &:hover {
    box-shadow: inset ${({ theme }) => theme.boxShadow};
    transform: scaleX(0.97);
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
