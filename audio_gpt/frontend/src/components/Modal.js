import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;