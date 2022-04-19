import React, { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import cssModule from './AdminComplain.module.css'
import Frame from "./assets/Frame.png";
import Ctc1 from "./assets/ctc1_admin.png";
import Ctc2 from "./assets/ctc2_admin.png";
import Chat1 from "./assets/chat1_admin.png";

function OffCanvasAdmin() {
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
                    <img src={Ctc1} />
                    <img src={Ctc2} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvasAdmin