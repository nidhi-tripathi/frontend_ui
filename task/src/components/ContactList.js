import React from "react";
import "./styles.css";

const ContactList = ({ contacts, selectContact, openModal }) => {
  const handleOptionsClick = (e, id) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    openModal(id, rect);
  };
  return (
    <div className="contact-list">
      <div style={{ borderBottom: "1px solid #ddd" }}>
        <h1>Chats</h1>
      </div>
      {contacts.map((contact) => (
        <div
          key={contact.userId}
          className={`contact-item ${contact.unreadCount > 0 ? "unread" : ""}`}
        >
          <div
            className="contact-info"
            onClick={() => selectContact(contact.userId)}
          >
            <img
              src={contact.profilePictureURL}
              alt={`${contact.name}`}
              className="profile-picture"
            />
            <div>
              <h3>{contact.name}</h3>
              <p>
                {contact.chat[contact.chat.length - 1]?.user1?.message ||
                  contact.chat[contact.chat.length - 1]?.you?.message}
              </p>
              {contact.unreadCount > 0 && (
                <span className="unread-count">{contact.unreadCount}</span>
              )}
            </div>
          </div>

          <button
            className="options-button"
            onClick={(e) => handleOptionsClick(e, contact.userId)}
          >
            ...
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
