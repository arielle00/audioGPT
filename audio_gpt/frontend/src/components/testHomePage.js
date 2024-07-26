import React, { useState } from "react";
import axios from "axios";
import './testHomePage.css'
// import './index.css';

function TestHomePage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const audioName = "my_audio";

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const fd = new FormData();
    fd.append('audio_file', file);
    fd.append('audio_name', audioName);

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });


    axios.post('/api/add-audio', fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress({ started: true, pc: percentCompleted });
        console.log(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(res => {
      setMsg("Upload successful");
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Upload failed");
      console.error(err);
    });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-customColorGreen">
      <div className="p-8 bg-customColorGray rounded-lg shadow-md h-100 w-100">
        <h1 className="text-2xl font-bold mb-4">Uploading files</h1>
        <input
          className="mb-4 p-2 border border-gray-300 rounded-lg"
          onChange={(e) => { setFile(e.target.files[0]) }}
          type="file"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleUpload}
        >
          Upload
        </button>
        {msg && <p className="mt-4 text-green-600">{msg}</p>}
        {progress.started && <p className="mt-2">Progress: {progress.pc}%</p>}
      </div>
    </div>
  );
}

export default TestHomePage;
