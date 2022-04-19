import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import cssModule from './UserComplain.module.css'
import Frame from "./assets/Frame.png";
import Apfp from "./assets/admin1.png";

function OffCanvasUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className={cssModule.btnOpen}>
                Open Contact
            </Button>

            <Offcanvas className={cssModule.offcanvas} show={show} onHide={handleClose}>
                <Offcanvas.Header className={cssModule.offcanvasHeader} closeButton>
                    <Offcanvas.Title><img src={Frame} /></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={cssModule.offcanvasBody}>
                    <div className={cssModule.flxRow}>
                        <img src={Apfp} alt='icon' />
                        <div className={cssModule.flxCol}>
                            <p>Admin</p>
                            <p>Yes, Is there anything I can help</p>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasUser;