
import React, { useState } from 'react';
import { data } from './data/data';
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [contacts, setContacts] = useState(data);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContactId, setModalContactId] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);

  const selectContact = (id) => {
    setContacts((prevContacts) => 
      prevContacts.map((contact) => 
        contact.userId === id ? { ...contact, unreadCount: 0 } : contact
      )
    );
    setSelectedContactId(id);
  };

  const openModal = (id, rect) => {
    setModalContactId(id);
    setModalPosition({ top: rect.top, left: rect.left - 150 });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const markAsUnread = () => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.userId === modalContactId ? { ...contact, unreadCount: 1 } : contact
      )
    );
    closeModal();
  };

  const deleteConversation = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.userId !== modalContactId)
    );
    closeModal();
    if (selectedContactId === modalContactId) {
      setSelectedContactId(null);
    }
  };

  const selectedContact = contacts.find((contact) => contact.userId === selectedContactId);

  return (
    <div className="app">
      <div className="sidebar">
        <ContactList
          contacts={contacts}
          selectContact={selectContact}
          openModal={openModal}
        />
      </div>
      <div className="chat-container">
        {selectedContact ? (
          <Conversation 
          contact={selectedContact}
          openModal={openModal} />
        ) : (
          <div className="no-contact-selected">
            <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          closeModal={closeModal}
          markAsUnread={markAsUnread}
          deleteConversation={deleteConversation}
          position={modalPosition}
        />
      )}
    </div>
  );
}

export default App;
