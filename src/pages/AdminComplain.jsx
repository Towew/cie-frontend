import React, {useEffect, useState, useContext} from 'react'
/* import OffCanvasAdmin from '../components/OffCanvasAdmin'; */
import cssModule from '../components/AdminComplain.module.css'
import NavigationAdmin from '../components/NavigationAdmin'
import {io} from 'socket.io-client'
import { Container, Row, Col } from 'react-bootstrap';
import Contact from '../components/complain/Contact'
import { UserContext } from '../context/userContext';
import Chat from '../components/complain/Chat'



let socket;

function AdminComplain() {
    let title = 'Complain Page'
    document.title = 'Dumbmerch | ' + title

    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [state] = useContext(UserContext);


    useEffect(() => {
            socket = io(process.env.REACT_APP_SERVER_URL, {
                auth: {
                    token: localStorage.getItem('token'),
                },
            });
        
        socket.on('new message', () => {
            socket.emit('load messages', contact?.id);
          });

        loadContact();
        loadMessages();


        socket.on('connect_error', (err) => {
            console.error(err.message);
          });

        return () => {
            socket.disconnect();
        };
    }, [messages])

    const loadContact = () => {
        socket.emit('load customer contact');
    
        socket.on('customer contact', (data) => {
            let dataContacts = data.map((item) => ({
                ...item,
                message: 'Click here to start message',
              }));
          setContacts(dataContacts);
        });
      };
    
      const onClickContact = (data) => {
        setContact(data);
        socket.emit('load messages', data.id);
      };

      const loadMessages = () => {
        socket.on('messages', (data) => {
            console.log(data)
          if (data.length > 0) {
            const dataMessages = data.map((item) => ({
              idSender: item.sender.id,
              message: item.message,
            }));
            console.log(dataMessages);
            setMessages(dataMessages);
          } else {
            setMessages([]);
          }
        });
      };
    
      const onSendMessage = (e) => {
        if (e.key === 'Enter') {
          const data = {
            idRecipient: contact.id,
            message: e.target.value,
          };
    
          socket.emit('send message', data);
          e.target.value = '';
        }
      };
    

    return (
        <div className={cssModule.AdminComplainC}>

            <NavigationAdmin title={title} />
            <Container fluid style={{ height: '87vh' }}>
        <Row>
          <Col
            md={3}
            style={{ height: '87vh' }}
            className="border-end border-dark- overflow-auto"
          >
            <Contact
              clickContact={onClickContact}
              dataContact={contacts}
              contact={contact}
            />
          </Col>
          <Col
            md={9}
            style={{ height: '87vh' }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Chat
              contact={contact}
              messages={messages}
              user={state.user}
              sendMessage={onSendMessage}
            />
          </Col>
        </Row>
      </Container>

        </div>
    )
}

export default AdminComplain;
            {/* <div className={cssModule.mainContainer}>
                <div className={cssModule.container}>
                    <div className={cssModule.leftSide}>
                        <OffCanvasAdmin />
                    </div>
                    <div className={cssModule.rightSide}>
                        <img src={Chat1} />
                        <input type="text" placeholder='Send Message' />
                    </div>
                </div>
            </div> */}