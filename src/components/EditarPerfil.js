import React, { useState } from 'react';
import '../styles/EditarPerfil.css';
import { useNavigate } from 'react-router-dom';

function EditarPerfil() {
  const [formData, setFormData] = useState({
    username: 'exemplo',
    email: 'exemplo@email.com',
    senhaAtual: '',
    novaSenha: '',
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
    // Adicione a lógica para atualizar as informações do perfil no servidor
    console.log('Dados do formulário de edição de perfil:', formData);
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };




  return (
    <div>
        <header>
          <h1>Meu Cabeçalho</h1>
          <nav>
              <ul>
                  <li><a href="#">Página Inicial</a></li>
                  <li><a href="#">Sobre</a></li>
                  <li><a href="#">Contato</a></li>
              </ul>
          </nav>
      </header>

      <main>
      <h1>Editar Perfil</h1>
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
          <label htmlFor="senhaAtual">Senha Atual:</label>
          <input
            type="password"
            id="senhaAtual"
            name="senhaAtual"
            value={formData.senhaAtual}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="novaSenha">Nova Senha:</label>
          <input
            type="password"
            id="novaSenha"
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Salvar edições</button>
        </div>
        
      </form>
      </main>

      <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default EditarPerfil;
