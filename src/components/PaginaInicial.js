import React from 'react';
import '../styles/PaginaInicial.css';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { logout } from '../firebaseConnection'
function PaginaInicial() {
 

  const handleSair = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const linkStyle = {
    color: '#344648',
    textDecoration: 'none',
  };

  return (
    <div>

      <body>
      
      <div className='wrapeInicialHeader'>
      <header>
      <div className='NavBarInicial'>
      <Link className='TituloHeader' to="/pagina-inicial" style={linkStyle}>This or That - The Game</Link>
          <ul className='linksA'>
            <li><Link className='linksAux' to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link className='linksAux' to="/escolher-opcoes">Jogar</Link></li>
            <li><Link className='linksAux' to="/ranking">Ranking</Link></li>
            <Link className="under" to="/editar-perfil"  style={linkStyle}><Avatar src="/broken-image.jpg" /></Link>
          </ul>
       
      </div>
      </header>
     </div>
      <div className="corpo">
      
          <div className="botoes-principais">
          <h2 className='gameTitle'>This or That - The Game</h2>
          <span class="regua"></span>
            <Link to="/escolher-opcoes">
              <button  className = "botao-estilo-padrao">Jogar</button>
            </Link>
            <Link to="/ranking">
              <button  className = "botao-estilo-padrao">Ranking</button>
            </Link>
          
            <button className = "botao-voltar" onClick={handleSair}>Sair</button>
            </div>
        </div>
      
      
      <footer className='bottomInicial'>
        <p>&copy; 2023 This or That - The Game. Todos os direitos reservados.</p>
      </footer>
      </body>
    </div>
  );
}

export default PaginaInicial;
