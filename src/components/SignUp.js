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

      <body>

        <div className='wrapHeaderSignUp'>
        <header>
        <div className='NavBarSignUp'>
          <div className='logoSignUp'><h3>This or That - The Game</h3></div>
          {/* 
            <ul className='LinksSignUpPai'>
                <li className='LinksSignUp'><a href="/pagina-inicial">Página Inicial</a></li>
                <li className='LinksSignUp'><a href="/escolher-opcoes">Jogar</a></li>
                <li className='LinksSignUp'><a href="/ranking">Ranking</a></li>
            </ul>
            */}
          </div>
    </header>

    </div>
    
    <div className='wrapMainSignUp'>

    <div className='FormSignUp'>
    <form onSubmit={handleSubmit}>
        <div>
          <h3 className="titlesSignUp">Nome de Usuário:</h3>
          <input className='inputSignUp'
            type="text"
            id="username"
            placeholder='Nome'
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3 className="titlesSignUp">E-mail:</h3>
          <input className='inputSignUp'
            type="email"
            id="email"
            placeholder='Email'
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3 className="titlesSignUp">Senha:</h3>
          <input className='inputSignUp'
            type="password"
            id="password"
            placeholder='Senha'
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button className='BotoesSignUp' onClick={handleVoltar}>Voltar</button>
        <button className='BotoesSignUp' type="submit">Criar Conta</button>
       
       
      </form>
    
      </div>

      </div>
    </body>
    <footer className='footerSignUp'>
        <p>&copy; 2023 This or That - The Game. Todos os direitos reservados.</p>
    </footer>

    </div>
  );
}

export default SignUp;
