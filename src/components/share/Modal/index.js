import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function Modal({
  children,
  dimmed,
  onClose,
  isClosed,
  background,
}) {
  return (
    <Wrapper>
      <Dimmed dimmed={dimmed} onClick={onClose} />
      <StyledModal
        className="modal"
        tabIndex="-1"
        onClose={onClose}
        isClosed={isClosed}
        background={background}
      >
        {children}
        <CloseButton className="close" onClick={onClose}>
          x
        </CloseButton>
      </StyledModal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Dimmed = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme, dimmed }) =>
    dimmed ? `${theme.deepGray}80` : 'transparent'};
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
  background-color: ${({ background }) =>
    background ? background : `${theme.lightPurple}95`};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  text-shadow: 0px 6px 2px ${({ theme }) => theme.purple};
  background-color: transparent;
  color: ${({ theme }) => theme.white};
`;
