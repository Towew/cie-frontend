import React from "react";
import cssModule from './Chat.module.css'
import default_profile from '../assets/Frame.png'

export default function Chat({ contact, user, messages, sendMessage }) {
  return (
    <>
      {contact ? (
        <>
          <div id="chat-messages" style={{ height: "81vh" }} className="overflow-auto px-3 py-2">
          {messages.map((item, index) => (
              <div key={index}>
                <div className={`d-flex py-1 ${item.idSender === user.id ? "justify-content-end": "justify-content-start"}`}>
                  {item.idSender !== user.id && (
                    <img src={contact.profile?.image || default_profile} className={cssModule.imgChat} alt="bubble avatar" />
                  )}
                  <div
                    className={ item.idSender === user.id ? cssModule.chatMe : cssModule.chatOther}
                  >
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '6vh' }}className="px-3">
            <input 
              placeholder="Send Message" 
              className={cssModule.inputMessage} 
              onKeyPress={sendMessage} />
          </div>
        </>
      ) : (
        <div
          style={{ height: "87vh" }}
          className="h4 d-flex justify-content-center align-items-center"
        >
          No Message
        </div>
      )}
    </>
  );
}
