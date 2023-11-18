import React, { useState } from 'react'; 
import '../styles/RecuperarSenha.css'; 
import { useNavigate } from 'react-router-dom'; 
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../firebaseConnection"
import { toast } from "react-toastify";


function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try { 
      await sendPasswordResetEmail(auth, email); 
      setMensagem('Um email com instruções para recuperar sua senha foi enviado para '+ email); 
      setEnviado(true); 
      toast.success('Email enviado com sucesso!'); 
    } catch (error) { 
      console.error('Erro ao enviar email de recuperação de senha:', error); 
      if (error.code === 'auth/invalid-email') { 
        toast.error('Email inválido!'); 
      } else { 
        toast.error('Ocorreu um erro ao enviar o email. Por favor, tente novamente mais tarde.'); 
      } 
    } 
  }; 
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div>
        <header>
        <h1>This or That - The Game</h1>
        <nav>
            <ul>
                <li><a href="/pagina-inicial">Página Inicial</a></li>
                <li><a href="/escolher-opcoes">Jogar</a></li>
                <li><a href="/ranking">Ranking</a></li>
            </ul>
        </nav>
    </header>

    <main>
      {enviado ? (
        <p>{mensagem}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Digite seu email. Uma nova senha será enviada, e você poderá alterá-la depois.</label>
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
            <button type="submit">Enviar</button>
          </div>
          <div>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
          {mensagem && <p>{mensagem}</p>}
        </form>
      )}

    </main>

    <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
    </footer>
    </div>
  );
}

export default RecuperarSenha;
