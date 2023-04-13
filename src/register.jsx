import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import bcrypt from "bcryptjs"; // importa a biblioteca bcryptjs

import './Login.css';

export default function SignUpPage() {
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const saltRounds = 10; // define o número de rounds de sal usados para criptografia
        const hashedPassword = bcrypt.hashSync(password, saltRounds); // criptografa a senha usando o bcryptjs
  
        const endpoint = `https://sngx3c6fe7.execute-api.sa-east-1.amazonaws.com/dev/cadastro`;
        const params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstname, username,email, password: hashedPassword }) // envia a senha criptografada para a API
        };
        fetch(endpoint, params)
          .then((res) => {
            if (res.status === 200) {
              // redireciona para a página de sucesso
              history.push("/");
              window.alert("ue");
            } else if(res.status === 400){
              // exibe uma mensagem de erro
              window.alert("Email ja existe");
            } else if(res.status === 401){
              // exibe uma mensagem de erro
              window.alert("Username ja existe");
            }
            else if(res.status === 402){
              // exibe uma mensagem de erro
              window.alert("Username e email ja existem");
            }

            
          });
      }

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleLogin}>
                <p>
                    <label>Primeiro nome</label><br/>
                    <input type="text" name="first_name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                </p>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </p>
                <p>
                    <label>Email</label><br/>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}required />
                </p>
                <p>
                    <label>Senha</label><br/>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
