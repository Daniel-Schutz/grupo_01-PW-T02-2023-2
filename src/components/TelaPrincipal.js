import React, { useState } from 'react';
import '..styles/TelaPrincipal.css';

function TelaPrincipal() {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const handleImagemClick = (imagem) => {
    setImagemSelecionada(imagem);
  };

  const imagens = [
    {
      id: 1,
      src: 'imagem1.jpg',
      legenda: 'Imagem 1',
    },
    {
      id: 2,
      src: 'imagem2.jpg',
      legenda: 'Imagem 2',
    },
  ];

  return (
    <div>
      <h1>Tela Principal</h1>
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
    </div>
  );
}

export default TelaPrincipal;
