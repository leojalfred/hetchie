import React from 'react'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Modal.scss'

export default function Modal({
  contentLabel,
  isOpen,
  onRequestClose,
  icon,
  children,
}) {
  ReactModal.setAppElement('#root')

  return (
    <ReactModal
      className={{
        base: 'modal',
        afterOpen: 'modal--after-open',
        beforeClose: 'modal--before-close',
      }}
      overlayClassName={{
        base: 'modal__overlay',
        afterOpen: 'modal__overlay--after-open',
        beforeClose: 'modal__overlay--before-close',
      }}
      portalClassName=""
      bodyOpenClassName="body--modal-open"
      contentLabel={contentLabel}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
    >
      <div className="modal__side">
        <FontAwesomeIcon className="modal__icon" icon={icon} />
      </div>
      <div className="modal__main">
        <div className="modal__wrapper">{children}</div>
      </div>
    </ReactModal>
  )
}
