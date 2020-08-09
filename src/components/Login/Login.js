import React, { useState, useContext } from "react";
import "./Login.css";
import { AuthContext } from "../Context/AuthContext";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus, dataUser] = useContext(AuthContext);

  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "username") {
      setUsername(value);
    } else if (event.target.name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === dataUser.username && password === dataUser.password) {
      setStatus(true);
      alert(`Login sukses! Selamat datang ${username} ^^`);
      //   Reset input
      setUsername("");
      setPassword("");
    } else {
      alert("Kombinasi Username dan Password Salah! Silakan ulangi kembali.");
      //   Reset input
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      {status === false ? (
        <>
          <h3>Login Page</h3>
          <form onSubmit={handleSubmit}>
            <div className="login">
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <input type="submit" value="Login" onClick={handleSubmit} />

            </div>
          </form>
        </>
      ) : <Redirect to="/" />}
    </div>
  );
};

export default Login;
