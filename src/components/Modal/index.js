import styled from 'styled-components';
import theme from '../../styles/theme';

import { flexCenterColumn } from '../../styles/share/common';

export default function Modal({ children, dimmed, onClose, background }) {
  return (
    <Wrapper>
      <Dimmed data-testid="dimmed" dimmed={dimmed} onClick={onClose} />
      <StyledModal className="modal" tabIndex="-1" background={background}>
        {children}
        <CloseButton className="close" onClick={onClose}>
          x
        </CloseButton>
      </StyledModal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 375px;
  height: 713px;
  margin: auto;
  transform: translate(-50%, -50%);
`;

const Dimmed = styled.div`
  ${flexCenterColumn}
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme, dimmed }) =>
    dimmed ? `${theme.white}99` : 'transparent'};
`;

const StyledModal = styled.div`
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  text-align: center;
  transform: translate(-50%, -50%);
  border-radius: 25px;
  background-color: ${({ background, theme }) =>
    background ? theme[background] : `${theme.lightPurple}`};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
  text-shadow: 0px 6px 2px ${({ theme }) => theme.deepGray};
  background-color: transparent;
  color: ${({ theme }) => theme.white};

  &:active,
  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.deepGray};
  }
`;
