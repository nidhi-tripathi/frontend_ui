import React, { useState, useEffect } from "react";
import "./styles.css";

const Conversation = ({  contact , openModal }) => {

let cname="user-message";

  const handleOptionsClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    openModal(contact.userId, rect);
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    contact.unreadCount = 0;
  }, [contact]);

  const handleSendMessage = () => {
    if (message.trim()) {
      contact.chat.push({
        you: { message, timeStamp: new Date().toLocaleTimeString() },
      });
      setMessage("");
    }
  };

 
  return (
    <div className="conversation">
      <div className="conversation-header">
        <div className="header-left">
          <img
            src={contact.profilePictureURL}
            alt={`${contact.name}`}
            className="profile-picture-large"
          />
          <div>
            <h2>{contact.name}</h2>
            <p>online</p>
          </div>
        </div>

        <div className="header-right">
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-phone"
              width="28"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
          </button>
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-video"
              width="28"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
              <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
            </svg>
          </button>
          <button
            className="options-button"
            onClick={(e) => handleOptionsClick(e, contact.userId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-dots-vertical"
              width="28"
              height="30"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="conversation-content">
   


        {contact.chat.map((msg, index) => {
          const isMyMessage = !msg.you;
          
          (msg.you)?cname="user-message":cname="my-message"
          return (
            <div
              key={index}  
            >
               {/* {console.log(msg.user.message)}
              {console.log(msg.you.message)} */}
             <div>
              <div className="message message-content user-message">
                <p>
                  {msg.user.message} 
                </p>
                <div className="timestamp">
                {msg.user.timeStamp}
              </div>
              </div>
              
              </div>

              <div>
              <div className="message message-content my-message">
                <p>
                  {msg.you.message}
                </p>
                <div className="my-timestamp">
                {msg.you.timeStamp}
              </div>
              </div>
            
              </div>
           </div>
          );
        })}
        <div className="message-input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-plus"
            width="35"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#686868"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M9 12h6" />
            <path d="M12 9v6" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-microphone"
            width="32"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#686868"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <path d="M8 21l8 0" />
            <path d="M12 17l0 4" />
          </svg>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
