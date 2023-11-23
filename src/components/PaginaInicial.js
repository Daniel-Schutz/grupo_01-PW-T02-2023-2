import React from 'react';
import '../styles/PaginaInicial.css';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

function PaginaInicial() {
 
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
        <h1>This or That - The Game</h1>
        
          <div className="botoes-principais">
            <Link to="/escolher-opcoes">
              <button  className = "botao-estilo-padrao">Jogar</button>
            </Link>
            <Link to="/ranking">
              <button  className = "botao-estilo-padrao">Ranking</button>
            </Link>
          
            <button className = "botao-voltar" onClick={handleVoltar}>Voltar</button>
            </div>
        </div>
      
      
      <footer className='bottomInicial'>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
      </footer>
      </body>
    </div>
  );
}

export default PaginaInicial;
