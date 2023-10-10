import React, { useState } from 'react';
import '..styles/EditarPerfil.css';

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

  return (
    <div>
      <h1>Editar Perfil</h1>
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
          <button type="submit">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
}

export default EditarPerfil;
