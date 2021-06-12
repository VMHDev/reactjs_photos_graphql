import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import './styles.scss';

const ModalOkCancel = ({ onClickOk }) => {
  const modalOkCancel = useSelector((state) => state.app.modalOkCancel || {});
  const [isShowDialog, setIsShowDialog] = useState(false);

  useEffect(() => {
    if (modalOkCancel.title || modalOkCancel.content) {
      setIsShowDialog(true);
    } else {
      setIsShowDialog(false);
    }
  }, [modalOkCancel]);

  const toggle = () => setIsShowDialog(!isShowDialog);

  return (
    <div>
      <Modal isOpen={isShowDialog} toggle={toggle}>
        <ModalHeader className='modal__header' toggle={toggle}>
          {modalOkCancel.title}
        </ModalHeader>
        <ModalBody>{modalOkCancel.content}</ModalBody>
        <ModalFooter className='modal__footer'>
          <Button color='primary' onClick={onClickOk}>
            OK
          </Button>
          <Button color='primary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ModalOkCancel.propTypes = {
  onClickOk: PropTypes.func,
};

ModalOkCancel.defaultProps = {
  onClickOk: null,
};

export default ModalOkCancel;
