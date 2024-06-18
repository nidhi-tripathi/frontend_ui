import React, { useEffect, useRef } from "react";
import "./styles.css";

const Modal = ({ closeModal, markAsUnread, deleteConversation, position }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);
  if (!position) return null;
  return (
    <div
      className="modal"
      ref={modalRef}
      style={{
        top: position.top + window.scrollY,
        left: position.left + window.scrollX,
      }}
    >
      <div className="modal-content">
        <button className="modal-option" onClick={markAsUnread}>
          Mark as unread
        </button>
        <button className="modal-option" onClick={deleteConversation}>
          Delete{" "}
        </button>
        <button className="modal-option" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
