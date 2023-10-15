import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import '../styles/PaginaInicial.css';
import { useNavigate } from 'react-router-dom';


function PaginaInicial() {
  const handleJogarClick = () => {
    // Adicione a lógica para redirecionar para a página de jogo
    console.log('Clicou em Jogar');
  };

  const handleVerRankingClick = () => {
    // Adicione a lógica para redirecionar para a página de ranking
    console.log('Clicou em Ver Ranking');
  };

  const handleEditarPerfilClick = () => {
    // Adicione a lógica para redirecionar para a página de edição de perfil
    console.log('Clicou em Editar Perfil');
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div>
      <div className="header">
        <Link to="/editar-perfil">
        <button className="editar-perfil" onClick={handleEditarPerfilClick}>
          Editar Perfil
        </button>
        </Link>
      </div>
      <h1>This or That - The Game</h1>
      <div className="botoes-principais">
        <Link to="/escolher-opcoes">
        <button onClick={handleJogarClick}>Jogar</button>
        </Link>
        <Link to="/ranking">
        <button onClick={handleVerRankingClick}>Ver Ranking</button>
        </Link>
      </div>
      <div>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
    </div>
  );
}

export default PaginaInicial;
