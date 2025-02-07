import React, { useEffect } from "react";

const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
