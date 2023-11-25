import React, { useState } from 'react';
import '../styles/EditarPerfil.css';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app'

function EditarPerfil() {
  const user = firebase.auth().currentUser;
  const [formData, setFormData] = useState({
    username: user.displayName,
    email: user.email,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (formData.novaSenha){
      await user.updatePassword(formData.novaSenha)
    }
    if (formData.email !== user.email){
      await user.updateEmail(formData.email)
    }
    if (formData.username !== user.username){
      await user.updateProfile({
        displayName: formData.username
      })
    }
    console.log(user);
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

        <div className='wrapEditarPerfilHeader'>
         <header>
        <div className='NavBarEditarPerfil'>
        <Link className='TituloHeaderEditarPerfil' to="/pagina-inicial" style={linkStyle}>This or That - The Game</Link>
          <ul className='LinksEditarPerfilPai'>
            <li><Link className='LinksEditarPerfil' to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link className='LinksEditarPerfil' to="/escolher-opcoes">Jogar</Link></li>
            <li><Link className='LinksEditarPerfil' to="/ranking">Ranking</Link></li>
          </ul>
        
          </div>

        
      </header>

      </div>

      <div className='wrapMainEditarPerfil'>      

      <div className='FormEditarPerfil'>
        <h2 className='TituloEditarPerfil'>Editar Perfil</h2>
        <span className='reguaEditarPerfil'></span>
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className='titlesEditarPerfil'>Nome de Usuário:</h3>
          <input className='inputEditarPerfil'
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
          <h3 className='titlesEditarPerfil'>E-mail:</h3>
          <input className='inputEditarPerfil'
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
          <h3 className='titlesEditarPerfil'>Senha Atual:</h3>
          <input className='inputEditarPerfil'
            type="password"
            id="senhaAtual"
            placeholder='SenhaAtual'
            name="senhaAtual"
            value={formData.senhaAtual}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3 className='titlesEditarPerfil'>Nova Senha:</h3>
          <input className='inputEditarPerfil'
            type="password"
            id="novaSenha"
            placeholder='SenhaNova'
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleChange}
          />
        </div>
          <button className='BotoesEditarPerfil' onClick={handleVoltar}>Cancelar edições</button>
          <button className='BotoesEditarPerfil' onClick={handleVoltar}>Salvar edições</button>
        
          
   
        
      </form>

      </div>
      
      </div>
      <footer className='footerEditarPerfil'>
        <p>&copy; 2023 This or That - The Game. Todos os direitos reservados.</p>
      </footer>
      </body>
    </div>
  );
}

export default EditarPerfil;
