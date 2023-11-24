import React, { useState } from 'react'; 
import '../styles/RecuperarSenha.css'; 
import { useNavigate } from 'react-router-dom'; 
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "../firebaseConnection"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';



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

  const linkStyle = {
    color: '#344648',
    textDecoration: 'none',
  };

  return (
    <div>

      <body>

      <div className='wrapRecuperarSenhaHeader'>
        <header>
          <div className='NavBarRecuperarSenha'>
          <Link className='TituloHeaderRecuperarSenha' to="/pagina-inicial" style={linkStyle}>This or That - The Game</Link>        
            <ul className='LinksRecuperarSenha'>
                <li><Link className='LinksAuxRecuperarSenha' to="/pagina-inicial">Página Inicial</Link></li>
                <li><Link className='LinksAuxRecuperarSenha' to="/escolher-opcoes">Jogar</Link></li>
                <li><Link className='LinksAuxRecuperarSenha' to="/ranking">Ranking</Link></li>
            </ul>
        
        </div>
    </header>

     </div>

    <div className='wrapMainRecuperarSenha'>
    
      <div className='CorpoRecuperarSenha'>
      {enviado ? (
        <p>{mensagem}</p>
      ) : (
        <form className='formRecuperarSenha' onSubmit={handleSubmit}>
          <div>
            <h2 className='TituloRecuperarSenha'>Digite seu email. Uma nova senha será enviada, e você poderá alterá-la depois.</h2>
            <input className='InputRecuperarSenha'
              type="email"
              placeholder='Email'
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='BotoesRecuperarSenhaPai'>

            <button className='botoesRecuperarSenha' onClick={handleVoltar}>Voltar</button>

            <button className='botoesRecuperarSenha' type="submit">Enviar</button>
        </div>
          {mensagem && <p>{mensagem}</p>}
        </form>
      )}
        </div>
    
      </div>
    </body>

    <footer className='footerRecuperarSenha'>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
    </footer>
    </div>
  );
}

export default RecuperarSenha;
