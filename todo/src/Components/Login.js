import Input from "./Input";
import React, { useEffect, useState } from "react";
import "./Login.css";
import { loginAPI, registerAPI } from "../Utility/Services.js";
import Button from "./Button";

function Login({ setAuthReq }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setRegister] = useState(false);

  const login = (username, password) => {
    loginAPI(username, password).then((responce) => {
      localStorage.setItem("token", responce.data.token);
      localStorage.setItem("username", username);
      setAuthReq(false);
    }).catch(()=> {setAuthReq(true);});
  };

  const register = (username, password) => {
    registerAPI(username, password).then((responce) => {
      localStorage.setItem("token", responce.data.token);
      localStorage.setItem("username", username);
      setAuthReq(false);
    });
  };

  return (
    <div className="under">
      <form className="login">
        {isRegister ? "Register:" : "Login:"}
        <Input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.form.elements[1].focus();
              e.preventDefault();
            }
          }}
        />
        <Input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (isRegister) {
                register(username, password);
              } else {
                login(username, password);
              }
              e.preventDefault();
            }
          }}
        />
        <div className="buttons">
          <Button
            text={!isRegister ? "Register" : "Login"}
            onClick={(e) => {
              setRegister(!isRegister);
              e.preventDefault();
            }}
          />
          <Button
            className={"ok-btn"}
            text={"Ok"}
            onClick={(e) => {
              if (isRegister) {
                register(username, password);
              } else {
                login(username, password);
              }
              e.preventDefault();
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
