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
return (
    <div>
        <header>
        <h1 className="TituloHeader">This or That - The Game</h1>
        <nav>
            <ul>
                <li><a href="/pagina-inicial">Página Inicial</a></li>
                <li><a href="/escolher-opcoes">Jogar</a></li>
                <li><a href="/ranking">Ranking</a></li>
            </ul>
        </nav>
    </header>

    <main>
      <form onSubmit={signIn}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/recuperar-senha">
          <p className='RecuperarSenha'>Esqueci Minha Senha</p>
         </Link>
         
        <div className='links'>

           <Link to="/sign-up">
          <button type="button" >Criar Conta</button>
        </Link>
          <button type="submit">Entrar</button>
        </div>
      </form>
      
    </main>

    <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
    </footer>
    </div>
  );
}

export default Login;