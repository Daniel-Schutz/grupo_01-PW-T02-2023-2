import React, { useState, useEffect } from 'react';
import '../styles/Ranking.css';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from "../firebaseConnection";
import { Avatar } from '@mui/material';


function Ranking() {
  const [imagens, setImagens] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  
  // Use useEffect para buscar as imagens do Firestore e aplicar o filtro
  useEffect(() => {
    const buscarImagens = async () => {
      try {
        const imagensCollection = collection(db, 'imagens');
        let imagensQuery = query(imagensCollection);

        // Aplicar filtro por categoria, se selecionada
        if (categoriaFiltro !== '') {
          imagensQuery = query(imagensCollection, where('categoria', '==', categoriaFiltro));
        }

        imagensQuery = query(imagensQuery, orderBy('votos', 'desc'));
        const imagensSnapshot = await getDocs(imagensQuery);
        
        const imagensData = imagensSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(imagensData)
        setImagens(imagensData);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    };

    buscarImagens();
  }, [categoriaFiltro]);

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  const handleFiltrarCategoria = (categoria) => {
    setCategoriaFiltro(categoria);
  };
  const linkStyle = {
    color: '#344648',
    textDecoration: 'none',
  };

  return (
    <div>
      <body>
      <header className='rankingHeader'>
        <div className='NavBarRanking'> 
        <Link className='TituloHeaderRankiing'>This or That - The Game</Link>
          
          <ul className='listLinks'>
            <li><Link to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link to="/escolher-opcoes">Jogar</Link></li>
            <Link className="under" to="/editar-perfil"  style={linkStyle}><Avatar src="/broken-image.jpg" /></Link>
          </ul>

        </div>
      </header>

<main>
      <div>
        <label htmlFor="categoria">Filtrar por Categoria:</label>
        <select id="categoria" onChange={(e) => handleFiltrarCategoria(e.target.value)}>
          <option value="">Todas</option>
          <option value="animais">Animais</option>
          <option value="comidas">Comidas</option>
          <option value="esportes">Esportes</option>
          <option value="filmes">Filmes</option>
          <option value="lugares">Lugares</option>
        
        </select>
      </div>
  <h1>Ranking de Imagens</h1>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Imagem</th>
            <th>Categoria</th>
            <th>votos</th>
          </tr>
        </thead>
        <tbody>
          {imagens.map((imagem, index) => (
            <tr key={imagem.id}>
              <td>{index + 1}</td>
              <td>{imagem.descricao}</td>
              <td>{imagem.categoria}</td>
              <td>{imagem.votos}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
  </main>
</body>
<footer>
    <p>&copy; 2023 This or That - The Game. Todos os direitos reservados.</p>
</footer>

    </div>
  );
};

export default Ranking;
