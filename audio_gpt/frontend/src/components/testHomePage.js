import React, { useState } from "react";
import axios from "axios";
import './testHomePage.css'

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
    <div className="Button">
      <h1> Uploading files </h1>
      <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />
      <button onClick={handleUpload}> Upload</button>
      {msg && <p>{msg}</p>}
      {progress.started && <p>Progress: {progress.pc}%</p>}
    </div>
  );
}

export default TestHomePage;
