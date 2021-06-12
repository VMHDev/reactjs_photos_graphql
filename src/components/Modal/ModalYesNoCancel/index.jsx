import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import './styles.scss';

const ModalYesNoCancel = ({ onClickYes, onClickNo }) => {
  const modalYesNoCancel = useSelector(
    (state) => state.app.modalYesNoCancel || {}
  );
  const [isShowDialog, setIsShowDialog] = useState(false);

  useEffect(() => {
    if (modalYesNoCancel.title || modalYesNoCancel.content) {
      setIsShowDialog(true);
    } else {
      setIsShowDialog(false);
    }
  }, [modalYesNoCancel]);

  const toggle = () => setIsShowDialog(!isShowDialog);

  return (
    <div>
      <Modal isOpen={isShowDialog} toggle={toggle}>
        <ModalHeader className='modal__header' toggle={toggle}>
          {modalYesNoCancel.title}
        </ModalHeader>
        <ModalBody>{modalYesNoCancel.content}</ModalBody>
        <ModalFooter className='modal__footer'>
          <Button color='primary' onClick={onClickYes}>
            Yes
          </Button>
          <Button color='primary' onClick={onClickNo}>
            No
          </Button>
          <Button color='primary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalYesNoCancel.propTypes = {
  onClickYes: PropTypes.func,
  onClickNo: PropTypes.func,
};

ModalYesNoCancel.defaultProps = {
  onClickYes: null,
  onClickNo: null,
};

export default ModalYesNoCancel;
