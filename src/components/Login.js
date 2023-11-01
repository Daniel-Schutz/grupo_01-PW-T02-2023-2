// Importe as bibliotecas necessárias
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import '../styles/Login.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para autenticar o usuário
    console.log('Dados do formulário de login:', formData);
    // Limpar o formulário
    setFormData({
      email: '',
      password: '',
    });
  };


  return (
    <div>
        <header>
        <h1>Meu Cabeçalho</h1>
        <nav>
            <ul>
                <li><a href="/pagina-inicial">Página Inicial</a></li>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main>
    
    <h1>This or That - The Game</h1>
      <form onSubmit={handleSubmit}>
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
        
          
          <button type="submit">Entrar</button>
          
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
