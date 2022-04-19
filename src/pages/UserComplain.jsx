import React, { useState, useEffect, useContext } from 'react';
/* import OffCanvasUser from '../components/OffCanvasUser'; */
import cssModule from '../components/UserComplain.module.css'
import Navigation from '../components/Navigation';
import {io} from 'socket.io-client'
import Contact from '../components/complain/Contact'
import { Container, Row, Col } from 'react-bootstrap'
import Chat from '../components/complain/Chat'
import { UserContext } from '../context/userContext';

let socket;

function UserComplain() {
    let title = 'Complain Page'
    document.title = 'Dumbmerch | ' + title

    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [state] = useContext(UserContext);

    useEffect(() => {
        socket = io('https://dumbmerch-b32-server.herokuapp.com/' || 'http://localhost:5000/', {
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
        socket.emit('load admin contact')

        socket.on('admin contact', (data) => {
            console.log(data);
            let dataContacts = data.map((item) => ({
                ...item,
                message: 'Click here to start message',
              }));
          setContacts(dataContacts);
        });
    }

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
        <div>

            <Navigation title={title} />

            <Container fluid style ={{height: '87vh'}}>
            <Row>
                <Col md={3} style={{height: '87vh'}}
                className="border-end border-dark- overflow-auto">
                    <Contact
                    clickContact={onClickContact}
                    dataContact={contacts}
                    contact={contact}/>
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

export default UserComplain;
{/* <div className={cssModule.mainContainer}>
    <div className={cssModule.container}>
        <div className={cssModule.leftSide}>
            <OffCanvasUser />
        </div>
        <div className={cssModule.auCompRight}>
            <div className={cssModule.flxRow}>
                <div className={cssModule.bubbleRight}>
                    Hello Admin, I Need Your Help
                </div>
            </div>
            <div className={cssModule.flxRow}>
                <img className='mr20' src={Apfp} alt='icon' />
                <div className={cssModule.bubbleLeft}>
                    Yes, Is there anything I can help
                </div>
            </div>
            <input className='mt20 ml20' type='text' placeholder='Send Message' />
        </div>
    </div>
</div> */}