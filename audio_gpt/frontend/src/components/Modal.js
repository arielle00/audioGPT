// Modal.js
import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("tab1"); // State to track active tab

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-vanilla p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
        >
          &times;
        </button>
        <div className="mb-4">
          <button
            className={`px-4 py-2 ${activeTab === "tab1" ? "bg-blue-500 text-white" : "bg-gray-200"} rounded-l-lg`}
            onClick={() => setActiveTab("tab1")}
          >
            Select Template
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "tab2" ? "bg-blue-500 text-white" : "bg-gray-200"} rounded-r-lg`}
            onClick={() => setActiveTab("tab2")}
          >
            Add Template
          </button>
        </div>
        <div>
          {activeTab === "tab1" && (
            <div className="bg-vanilla">
              <h2 className="text-xl font-bold">Tab 1 Content</h2>
              <p>This is the content of Tab 1.</p>
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="bg-vanilla">
              <h2 className="text-xl font-bold">Tab 2 Content</h2>
              <p>This is the content of Tab 2.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;