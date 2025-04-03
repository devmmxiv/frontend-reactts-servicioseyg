import React from 'react'
import { Button, Modal } from 'react-bootstrap'
interface props {
    hideModal: () => void
    handleConfiracion: () => void
    show: boolean
}
const ModalConfirm = ({hideModal,handleConfiracion,show,}:props) => {

  return (
    <div>
 <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Seguro desea realizar la operacion?</Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleConfiracion}>
            Si
          </Button>
          <Button variant="secondary" onClick={hideModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default ModalConfirm
