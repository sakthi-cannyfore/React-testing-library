import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  const HandleClick = () => {
    setMessage("Loading...");
    if (username == "sakthi" && useremail == "sakthi@gmail.com") {
      setTimeout(() => {
        setMessage("Successfully Logged in ");
      }, 3000);
    } else {
      setMessage("Loading...");
      setTimeout(() => {
        setMessage("Invalid creditial ");
      }, 3000);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        placeholder="UserName"
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Enter Email"
        type="email"
        value={useremail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button onClick={HandleClick}>submit</button>
      {message && <p>{message}</p>}
    </div>
  );
}
