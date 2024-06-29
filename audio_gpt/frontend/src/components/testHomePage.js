import React, { useState } from "react";
import axios from "axios";

function TestHomePage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const fd = new FormData();
    fd.append('file', file);

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios.post('http://httpbin.org/post', fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress({ started: true, pc: percentCompleted });
        console.log(percentCompleted);
      },
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg("Upload Successful");
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
