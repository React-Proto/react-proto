import React from 'react';
import PropTypes from 'prop-types';
import SimpleModal from '../components/SimpleModal.jsx';

const createModal = ({
  message,
  closeModal,
  primBtnLabel,
  primBtnAction,
  secBtnAction = null,
  secBtnLabel = null,
  children = null,
}) => (
  <SimpleModal
    open={true}
    message={message}
    secBtnLabel={secBtnLabel}
    primBtnLabel={primBtnLabel}
    secBtnAction={secBtnAction}
    primBtnAction={primBtnAction}
    closeModal={closeModal}
  >
    {children}
  </SimpleModal>
);

createModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  primBtnAction: PropTypes.func.isRequired,
  secBtnAction: PropTypes.func.isRequired,
  children: PropTypes.object,
  message: PropTypes.string.isRequired,
  primBtnLabel: PropTypes.string.isRequired,
  secBtnLabel: PropTypes.string.isRequired,
};

export default createModal;
