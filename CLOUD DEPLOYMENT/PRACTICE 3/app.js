import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://<BACKEND-ALB-DNS>/api/message")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌍 AWS Full Stack App</h1>
      <p>Message from Backend: {message || "Loading..."}</p>
    </div>
  );
}

export default App;
