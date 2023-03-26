import { useEffect } from 'react';
import { ModalWindow } from './Modal.Styled';

export const Modal = props => {
    const onModalClick = (e) => {
    console.log("🚀 ~ file: Modal.jsx:16 ~ onModalClick ~ e:", e)
    
    e.preventDefault();
    if (e.code === 'Escape' || e.type === 'click')
      props.modalWindowHandler({ pageURL: null });
  };
  useEffect(() => {
    window.addEventListener('click', onModalClick);
    window.addEventListener('keydown', onModalClick);
    document.body.style.overflow = 'hidden';
    console.log('first useEffect')
    return () => {
      window.removeEventListener('click', onModalClick);
      window.removeEventListener('keydown', onModalClick);
      document.body.style.overflow = 'unset';
      console.log('return useEffect')
    };
  }, [onModalClick]);

  return (
    <ModalWindow className="overlay" onClick={()=> onModalClick()}>
      <div className="modal">{props.children}</div>
    </ModalWindow>
  );
};


