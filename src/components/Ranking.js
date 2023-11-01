import React, { useState, useEffect } from 'react';
import '../styles/Ranking.css';
import { useNavigate } from 'react-router-dom';


function Ranking() {
  const [imagens, setImagens] = useState([
    { id: 1, nome: 'Imagem 1', escolhas: 10 },
    { id: 2, nome: 'Imagem 2', escolhas: 15 },
    { id: 3, nome: 'Imagem 3', escolhas: 8 },
    { id: 4, nome: 'Imagem 4', escolhas: 12 },
    { id: 5, nome: 'Imagem 5', escolhas: 6 },
  ]);

  // Use useEffect para ordenar as imagens pelo número de escolhas
  useEffect(() => {
    const imagensOrdenadas = [...imagens].sort((a, b) => b.escolhas - a.escolhas);
    setImagens(imagensOrdenadas);
  }, []);

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div>
    <header>
    <h1>This or That - The Game</h1>
    <nav>
        <ul>
            <li><a href="/pagina-inicial">Página Inicial</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
        </ul>
    </nav>
</header>

<main>
    
<h1>Ranking de Imagens</h1>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Imagem</th>
            <th>Escolhas</th>
          </tr>
        </thead>
        <tbody>
          {imagens.map((imagem, index) => (
            <tr key={imagem.id}>
              <td>{index + 1}</td>
              <td>{imagem.nome}</td>
              <td>{imagem.escolhas}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
</main>

<footer>
    <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
</footer>
    </div>
  );
}

export default Ranking;
