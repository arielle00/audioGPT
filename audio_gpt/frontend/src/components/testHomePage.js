import React, { useState } from "react";
import axios from "axios";
import './testHomePage.css'
// import './index.css';

function TestHomePage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState()
  const audioName = "my_audio";

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

      // Check if the file is an audio file by checking its MIME type
    if (file.type.startsWith('audio/')) {
      setError('');
    } else {
      setError('Please upload a valid audio file.');
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
    <div className="flex justify-center items-center h-screen bg-gray">
      <div className="outline-dashed p-8 bg-vanilla rounded-lg shadow-md h-100 w-100">
        <h1 className="text-2xl font-bold mb-4">Please Upload Your Audio File (mp3)</h1>
        <div className="flex flex-row items-center space-x-2">
          <input
            className="p-2 border border-gray-300 bg-white rounded-full file:rounded-full"
            onChange={(e) => { setFile(e.target.files[0]) }}
            type="file"
          />
          
          <button
            className="bg-brown text-white px-4 py-2 rounded-lg hover:bg-raisin"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {msg && <p className="mt-4 text-green-600">{msg}</p>}
        {progress.started && <p className="mt-2">Progress: {progress.pc}%</p>}
        {error}
      </div>
    </div>
  );
}

export default TestHomePage;
