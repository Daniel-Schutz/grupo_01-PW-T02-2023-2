import React, { useState, useEffect } from 'react';
import '../styles/Ranking.css';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from "../firebaseConnection";

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

<footer>
    <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
</footer>

    </div>
  );
}

export default Ranking;
