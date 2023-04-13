import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import bcrypt from "bcryptjs"; // importa a biblioteca bcryptjs

import './Login.css';



export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = (e) => {
      e.preventDefault();
    
      const endpoint = `https://sngx3c6fe7.execute-api.sa-east-1.amazonaws.com/dev/login`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
      };
      fetch(endpoint, params)
        .then((res) => {
          if (res.status === 200) {
            // extrai o token do corpo da resposta e armazena em uma variável
            res.json().then((data) => {
              const token = data.token;
              const username = data.username;
              const email = data.email;
              localStorage.setItem('token', token);
              localStorage.setItem('username', username);
              localStorage.setItem('email', email);
              history.push("/HomePage");
              console.log(data.token)
              console.log(data.username)
              // faz alguma coisa com o token, como armazená-lo no local storage
            });
          } else {
            window.alert("Invalid credentials");
          }
        });
    }
  
    return (
      <div className="text-center m-5-auto">
        <h2>Praticando Saúde</h2>
        <form onSubmit={handleLogin}>
          <p>
            <label>Email</label><br/>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </p>
          <p>
            <label>Password</label>
            <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
            <br/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </p>
          <p>
            <button id="sub_btn" type="submit">Login</button>
          </p>
        </form>
        <footer>
          <p>First time? <Link to="/register">Create an account</Link>.</p>
        </footer>
      </div>
    );
}
