import { useEffect, useCallback } from 'react';
import { ModalWindow } from './Modal.Styled';

export const Modal = props => {
  const onModalClick = useCallback(
    e => {
      e.preventDefault();
      if (e.code === 'Escape' || e.type === 'click')
        props.modalWindowHandler({ pageURL: null });
    },
    [props]
  );
  useEffect(() => {
    window.addEventListener('click', onModalClick);
    window.addEventListener('keydown', onModalClick);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('click', onModalClick);
      window.removeEventListener('keydown', onModalClick);
      document.body.style.overflow = 'unset';
    };
  }, [onModalClick]);

  return (
    <ModalWindow className="overlay" onClick={() => onModalClick()}>
      <div className="modal">{props.children}</div>
    </ModalWindow>
  );
};
