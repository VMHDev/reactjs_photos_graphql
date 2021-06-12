import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import './styles.scss';

const ModalOk = () => {
  const modalOk = useSelector((state) => state.app.modalOk || {});
  const [isShowDialog, setIsShowDialog] = useState(false);

  useEffect(() => {
    if (modalOk.title || modalOk.content) {
      setIsShowDialog(true);
    }
  }, [modalOk]);

  const toggle = () => setIsShowDialog(!isShowDialog);

  return (
    <div>
      <Modal isOpen={isShowDialog} toggle={toggle}>
        <ModalHeader className='modal__header' toggle={toggle}>
          {modalOk.title}
        </ModalHeader>
        <ModalBody>{modalOk.content}</ModalBody>
        <ModalFooter className='modal__footer'>
          <Button color='primary' onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalOk;
