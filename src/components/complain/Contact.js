import React from "react";
import cssModule from "./Contact.module.css"
import default_profile from "../assets/Frame.png"

export default function Contact({ dataContact, clickContact, contact }) {
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`${cssModule.contact} ${
                contact?.id === item?.id && cssModule.contactActive
              }`}
              onClick={() => {
                clickContact(item);
              }}
            >
              <img
                src={item.profile?.image || default_profile}
                className={cssModule.imgContact}
                alt="user avatar"
              />
              <div className="pt-2">
                <ul className={cssModule.textContact}>
                  <li>{item.name}</li>
                  <li className={cssModule.textContactChat}>{item.message}</li>
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
