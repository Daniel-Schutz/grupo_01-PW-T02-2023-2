import React, { useState } from 'react';
import '../styles/TelaPrincipal.css';
import { useNavigate, Link } from 'react-router-dom';

function TelaPrincipal() {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [larguraBarra, setLarguraBarra] = useState(0); // Renomeada para larguraBarra

  const handleImagemClick = (imagem) => {
    setImagemSelecionada(imagem);
    setLarguraBarra(50); // Defina a largura da barra aqui (50% como exemplo)
  };

  const imagens = [
    {
      id: 1,
      src: 'strogonof.jpg',
      legenda: 'Strogonoff de carne',
    },
    {
      id: 2,
      src: 'fettuccine.jpg',
      legenda: 'Fettuccine com bolonhesa',
    },
  ];

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/pagina-inicial">Página Inicial</a></li>
            <li><a href="/escolher-opcoes">Jogar</a></li>
            <li><a href="/ranking">Ranking</a></li>
          </ul>
        </nav>
        <h1>This or That - The Game</h1>
        <div className="usuario-editar">
          <p>Olá Usuário!</p>
          <p><Link to="/editar-perfil" className="underlink">Editar Perfil</Link></p>
        </div>
      </header>
      <div className='TelaCentral'>
        <main>
          <div className="imagens-container">
            {imagens.map((imagem) => (
              <div
                key={imagem.id}
                className={`imagem ${imagemSelecionada === imagem ? 'selecionada' : ''}`}
                onClick={() => handleImagemClick(imagem)}
              >
                <div className={`barra-translucida ${imagemSelecionada === imagem ? (imagem.id === 1 ? 'esquerda' : 'direita') : ''}`} style={{ width: `${larguraBarra}%` }}></div>
                <img src={imagem.src} alt={imagem.legenda} />
                <p>{imagem.legenda}</p>
              </div>
            ))}
          </div>
          <div className='BotaoVoltar'>
            <button onClick={handleVoltar}>Voltar</button>
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default TelaPrincipal;
