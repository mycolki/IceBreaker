import ReactDOM from 'react-dom';

const modalRoot = document.createElement('div');
modalRoot.classList.add('.modal-root');
document.body.append(modalRoot);

export default function ModalPortal({ children }) {
  return ReactDOM.createPortal(children, modalRoot);
}
