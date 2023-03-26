import { Component } from 'react';
import { ModalWindow } from './Modal.Styled';

export class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener('click', this.onModalClick);
    window.addEventListener('keydown', this.onModalClick);
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onModalClick);
    window.removeEventListener('keydown', this.onModalClick);
    document.body.style.overflow = 'unset';
  }
  onModalClick = e => {
    if (e.code === 'Escape' || e.type === 'click')
      this.props.modalWindowHandler({ pageURL: null });
  };
  render() {
    return (
      <ModalWindow className="overlay" onClick={() => this.onModalClick}>
        <div className="modal">{this.props.children}</div>
      </ModalWindow>
    );
  }
}
