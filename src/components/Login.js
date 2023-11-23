import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth} from "../firebaseConnection";
import { useAuthState } from 'react-firebase-hooks/auth';
import "../styles/Login.css";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, /*error*/] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user)
    if (user) navigate("/pagina-inicial");
  }, [user, loading, navigate]);

  const signIn = async (e) => {
    e.preventDefault();
    console.log('log');
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
    }) 
    .catch((error) => {
      toast.error("Invalid email or password!");
      console.log(error);
    });

    console.log('cheguei');
  }
  const linkStyle = {
    color: '#344648',
    textDecoration: 'none',
  };
  // <style scoped>
  //   form
  // </style>
return (
  <div>

   <body>
    
    <div className="wrapHeader">
      <header>
          <div className="NavBar">
          <div className="logo"><h3>This or That - The Game</h3></div>
              {/* <ul className="links">
                  <li><a href="/pagina-inicial">Página Inicial</a></li>
                  <li><a href="/escolher-opcoes">Jogar</a></li>
                  <li><a href="/ranking">Ranking</a></li>
              </ul> */}
          </div>
          
      </header>
    </div>
    <div className="wrapMain">
    
      <div className = "FormSubmit">
      
      <form onSubmit={signIn}>
      <h2 className="loginTitle">Login</h2>
          <input className="input1"
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className="input2"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
       
      <Link to="/recuperar-senha" style={linkStyle}>
        <p className='RecuperarSenha'>Esqueci Minha Senha</p>
      </Link>
      <Link to="/sign-up">
        <button className = "botaoCriar" type="button" >Criar Conta</button>
      </Link>
        <button className = "botaoEntrar" type="submit">Entrar</button>
        
      </form>
      </div>
    
    </div>
    </body>
    
    <footer className="bottom">
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
    </footer>
    </div>
  );
}

export default Login;