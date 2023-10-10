import React from 'react';
import '../styles/PaginaInicial.css';

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

  return (
    <div>
      <div className="header">
        <button className="editar-perfil" onClick={handleEditarPerfilClick}>
          Editar Perfil
        </button>
      </div>
      <h1>Bem-vindo à Página Inicial</h1>
      <div className="botoes-principais">
        <button onClick={handleJogarClick}>Jogar</button>
        <button onClick={handleVerRankingClick}>Ver Ranking</button>
      </div>
    </div>
  );
}

export default PaginaInicial;
