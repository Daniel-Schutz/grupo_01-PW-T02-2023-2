import React, { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';


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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário para o servidor
    console.log('Dados do formulário enviados:', formData);
    // Limpar o formulário
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div>
      <h1>Página de Criar Conta</h1>
      <form onSubmit={handleSubmit}>
      <div className='BotaoVoltar'>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
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
        <div>
          <button type="submit">Criar Conta</button>
        </div>
      </form>

    </div>
  );
}

export default SignUp;
