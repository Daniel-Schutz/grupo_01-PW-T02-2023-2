// Importe as bibliotecas necessárias
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Autenticar o usuário usando Firebase
      await firebase.auth().signInWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // Redirecionar para a página desejada após o login bem-sucedido
      navigate('/tela-principal');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      toast.error('Não foi possível efetuar o login. Senha ou email inválidos!');

      // Tratar o erro conforme necessário (exibindo uma mensagem de erro, etc.)
    }
  };

  const navigate = useNavigate();


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
      <form>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='Links'>
          <Link to="/pagina-inicial">
          <Link to="/recuperar-senha">
          <p className='RecuperarSenha'>Esqueci Minha Senha</p>
         </Link>

           <Link to="/sign-up">
          <button>Criar Conta</button>
        </Link>
        
          
          <button onClick={handleSubmit}>Entrar</button>
          
          </Link>
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
