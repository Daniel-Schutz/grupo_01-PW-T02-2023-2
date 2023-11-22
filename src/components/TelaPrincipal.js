import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { db } from '../firebaseConnection';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import '../styles/TelaPrincipal.css';

function TelaPrincipal() {
  const [infoImagens, setInfoImagens] = useState([]);
  const location = useLocation();
  const categoriasSelecionadas = location.state?.categoriasSelecionadas || {};
  const navigate = useNavigate();

  const handleImagemClick = async (imagem) => {
    if (imagem) {
      const imagemRef = doc(db, 'imagens', imagem.id);
      await updateDoc(imagemRef, {
        votos: imagem.votos + 1,
      });
      buscarImagens(); // Atualiza as imagens após o voto
    }
  };

  const selecionarImagem = async (caminhoDaImagem) => {
    const storage = getStorage();
    const imageRef = ref(storage, caminhoDaImagem);

    try {
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Erro ao obter a URL da imagem:', error);
      throw error;
    }
  };

  const buscarImagens = async () => {
    try {
      const imagensCollection = collection(db, 'imagens');
      let imagensQuery = query(imagensCollection);

      const categoriasAtivas = Object.keys(categoriasSelecionadas).filter(
        (categoria) => categoriasSelecionadas[categoria]
      );

      imagensQuery = query(imagensCollection, where('categoria', 'in', categoriasAtivas));

      const imagensSnapshot = await getDocs(imagensQuery);
      const imagens = imagensSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const imagensPorCategoria = {};

      imagens.forEach((imagem) => {
        if (!imagensPorCategoria[imagem.categoria]) {
          imagensPorCategoria[imagem.categoria] = [];
        }
        imagensPorCategoria[imagem.categoria].push(imagem);
      });

      const categorias = Object.keys(imagensPorCategoria);
      const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
      const imagensDaCategoria = imagensPorCategoria[categoriaAleatoria];

      if (imagensDaCategoria.length >= 2) {
        const indicesAleatorios = [];

        while (indicesAleatorios.length < 2) {
          const indiceAleatorio = Math.floor(Math.random() * imagensDaCategoria.length);
          if (!indicesAleatorios.includes(indiceAleatorio)) {
            indicesAleatorios.push(indiceAleatorio);
          }
        }

        const imagensSelecionadas = indicesAleatorios.map((indice) => imagensDaCategoria[indice]);
        setInfoImagens(imagensSelecionadas);

        const linksImagens = imagensSelecionadas.map((imagem) => imagem.img_ref);

        try {
          const url1 = await selecionarImagem(linksImagens[0]);
          const url2 = await selecionarImagem(linksImagens[1]);

          // Atualiza o src das imagens diretamente no estado
          setInfoImagens((prevImagens) => [
            { ...prevImagens[0], url: url1 },
            { ...prevImagens[1], url: url2 },
          ]);
        } catch (error) {
          console.error('Erro ao obter a URL da imagem:', error);
        }
      } else {
        console.log('Não há imagens suficientes nessa categoria.');
      }
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  useEffect(() => {
    buscarImagens();
  }, [categoriasSelecionadas]); // Atualiza as imagens sempre que as categorias selecionadas mudam

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link to="/escolher-opcoes">Jogar</Link></li>
            <li><Link to="/ranking">Ranking</Link></li>
          </ul>
        </nav>
        <h1>This or That - The Game</h1>
        <div className="usuario-editar">
          <p>Olá Usuário!</p>
          <p><Link to="/editar-perfil" className="underlink">Editar Perfil</Link></p>
        </div>
      </header>
      <div className="TelaCentral">
        <main>
          <div className="imagens-container">
            {infoImagens.map((imagem, index) => (
              <img
                key={index}
                className="imagem-item"
                alt="Imagem do Firebase Storage"
                src={imagem.url}
                onClick={() => handleImagemClick(imagem)}
              />
            ))}
          </div>
          <div className="BotaoVoltar">
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
