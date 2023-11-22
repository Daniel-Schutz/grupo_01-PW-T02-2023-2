import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app'; // Modificado para 'compat'
import 'firebase/compat/auth'; // Modificado para 'compat'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
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
      // Criar um novo usuário no Firebase
      const { user } = await firebase.auth().createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // Atualizar o nome do usuário no perfil do Firebase
      await user.updateProfile({
        displayName: formData.username,
      });

      // Limpar o formulário
      setFormData({
        username: '',
        email: '',
        password: '',
      });

      
      navigate('/pagina-inicial');
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      toast.error('Não foi possível criar o usuário. Por favor, tente novamente.');
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
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className='Botoes'>
        <button onClick={handleVoltar}>Voltar</button>
          <button type="submit">Criar Conta</button>
        </div>
       
      </form>
    </main>

    <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
    </footer>

    </div>
  );
}

export default SignUp;
