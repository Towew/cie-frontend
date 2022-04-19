import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import cssModule from './ListCategory.module.css'

function DeleteButton({show, handleClose, setConfirmDelete}) {
 
    const handleDelete = () => {
        setConfirmDelete(true)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleDelete}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default DeleteButton;