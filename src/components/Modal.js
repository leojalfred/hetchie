import React from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.scss';

export default function Modal({
  contentLabel,
  isOpen,
  onRequestClose,
  icon,
  children,
}) {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      className="modal"
      overlayClassName="modal__overlay"
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
    >
      <div className="modal__image">
        <FontAwesomeIcon className="modal__icon" icon={icon} />
      </div>
      <div className="modal__main">
        <div className="modal__wrapper">{children}</div>
      </div>
    </ReactModal>
  );
}
