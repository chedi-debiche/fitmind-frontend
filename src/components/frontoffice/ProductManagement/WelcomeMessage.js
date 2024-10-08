import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function WelcomeMessage() {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to Fit Mind</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You can buy your products here.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeMessage;
