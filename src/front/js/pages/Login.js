import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import homechefBG from "../../img/homechefBG.jpg"


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);


  useEffect(() => {
    // check if there is token, then show nav bar we want; if not, then show log in page
    if (localStorage.getItem("token")) {
      actions.setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (store.token) {
      navigate("/");
    }
  }, [store.token]);

  const handleSubmit = () => {
    actions.login(username, password);
  };

  return (
    <div style={{
      backgroundImage: `url(${homechefBG})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "783px"
    }} className="d-flex justify-content-center p-5">
      <div className="position-absolute top-50 start-50 translate-middle">
        <h2 className="white-title title-font opacity60 p-2 shadow1">Enter your username<br></br>and password to login:</h2>
        <form className="opacity60 p-2 shadow1" onSubmit={handleSubmit}>
          <label className="mt-1">
            <input
              className="title-font me-1"
              type="username"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label className="mt-1">
            <input
              className="title-font me-1"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <div className="d-flex justify-content-center mt-3">
            <div className="btn white-title oy-button mb-2 title-font shadow1" onClick={() => handleSubmit()}>
              Log In
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
