import React from "react";
import "./input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <>
      <form action="">
        <input
          className="input"
          placeholder="Type a message...."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button
          className="sendButton"
          type="submit"
          onClick={(e) => sendMessage(e)}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Input;
