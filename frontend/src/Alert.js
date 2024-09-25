import React from "react";
import "./App.css"; // Import the CSS for styling

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert-message">
        {message}
        <button className="alert-close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
};

export default Alert;
