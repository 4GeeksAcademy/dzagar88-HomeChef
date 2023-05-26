import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  // useEffect(() => {
  //   // check if there is token, then show nav bar we want; if not, then show log in page
  //   if (localStorage.getItem("token")) {
  //     navigate("/main");
  //   }
  // }, [localStorage.getItem("token")]);

  const handleSubmit = () => {
    actions.login(username, password);
  };

  return (
    <form className="text-center m-5" onSubmit={handleSubmit}>
      <label className="mx-2">
        Username:
        <input
          className="mx-1"
          type="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          className="mx-1"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <div className="btn btn-success" onClick={() => handleSubmit()}>Log In</div>
    </form>
  );
}
