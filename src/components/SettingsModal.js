import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { updateUser } from '../actions/authActions';
import Modal from './Modal';
import CredentialsForm from './CredentialsForm';

function SettingsModal({ isOpen, closeModal, errors, updateUser }) {
  return (
    <Modal
      contentLabel="Settings Modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      icon={faUserPlus}
    >
      <div className="modal__content">
        <div className="modal__topline">
          <div className="modal__text">
            <h2 className="modal__heading">Get started</h2>
            <p className="modal__description">
              Create an account to start optimizing your bids
            </p>
          </div>
          <FontAwesomeIcon
            className="modal__close"
            icon={faTimesCircle}
            onClick={closeModal}
          />
        </div>
      </div>

      <CredentialsForm
        errors={errors}
        handler={updateUser}
        closeModal={closeModal}
      />
    </Modal>
  );
}

function mapStateToProps({ errors }) {
  return { errors };
}
export default connect(mapStateToProps, { updateUser })(SettingsModal);
