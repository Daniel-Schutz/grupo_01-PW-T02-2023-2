import React, { useState } from 'react';
import '../styles/TelaPrincipal.css';
import { useNavigate } from 'react-router-dom';


function TelaPrincipal() {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const handleImagemClick = (imagem) => {
    setImagemSelecionada(imagem);
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
    <div className='TelaCentral'>
      <div className="imagens-container">
        {imagens.map((imagem) => (
          <div
            key={imagem.id}
            className={`imagem ${imagemSelecionada === imagem ? 'selecionada' : ''}`}
            onClick={() => handleImagemClick(imagem)}
          >
            <img src={imagem.src} alt={imagem.legenda} />
            <p>{imagem.legenda}</p>
          </div>
        ))}
      </div>
      <div className='BotaoVoltar'>
        <button onClick={handleVoltar}>Voltar</button>
      </div>
    </div>
  );
}

export default TelaPrincipal;
