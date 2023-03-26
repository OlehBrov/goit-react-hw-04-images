import { useEffect } from 'react';
import { ModalWindow } from './Modal.Styled';

export const Modal = props => {
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
  }, []);
  const onModalClick = (e) => {
    console.log("🚀 ~ file: Modal.jsx:16 ~ onModalClick ~ e:", e)
    
    e.preventDefault();
    if (e.code === 'Escape' || e.type === 'click')
      props.modalWindowHandler({ pageURL: null });
  };
  return (
    <ModalWindow className="overlay" onClick={()=> onModalClick()}>
      <div className="modal">{props.children}</div>
    </ModalWindow>
  );
};

// export class Modal extends Component {
//   state = {};
//   componentDidMount() {
//     window.addEventListener('click', this.onModalClick);
//     window.addEventListener('keydown', this.onModalClick);
//     document.body.style.overflow = 'hidden';
//   }
//   componentWillUnmount() {
//     window.removeEventListener('click', this.onModalClick);
//     window.removeEventListener('keydown', this.onModalClick);
//     document.body.style.overflow = 'unset';
//   }
//   onModalClick = e => {
//     if (e.code === 'Escape' || e.type === 'click')
//       this.props.modalWindowHandler({ pageURL: null });
//   };
//   render() {
//     return (
//       <ModalWindow className="overlay" onClick={() => this.onModalClick}>
//         <div className="modal">{this.props.children}</div>
//       </ModalWindow>
//     );
//   }
// }
