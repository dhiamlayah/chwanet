import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UpdateNames from '../components/updateData/UpdateNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const boxForUpdateData = ({ updateData, setShowUpdateDiv }: any) => {
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
         <h1
            className="px-2"
            style={{ cursor: "pointer" }}
            onClick={handleShow }
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </h1>

          
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <UpdateNames updateData={updateData} setNewData={setNewData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default boxForUpdateData;
