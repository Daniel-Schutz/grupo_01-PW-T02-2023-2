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
import { Avatar } from '@mui/material';


function TelaPrincipal() {
  const [infoImagens, setInfoImagens] = useState([]);
  const [votesImage1, setVotesImage1] = useState(0);
  const [votesImage2, setVotesImage2] = useState(0);
  const [showVoteBars, setShowVoteBars] = useState(false);
  const location = useLocation();
  const categoriasSelecionadas = location.state?.categoriasSelecionadas || {};
  const navigate = useNavigate();

  const handleImagemClick = async (imagem) => {
    if (imagem) {
      const imagemRef = doc(db, 'imagens', imagem.id);
      await updateDoc(imagemRef, {
        votos: imagem.votos + 1,
      });

      if (infoImagens[0].id === imagem.id) {
        setVotesImage1(infoImagens[0].votos + 1 / (infoImagens[1].votos + infoImagens[0].votos + 1) * 100);
        setVotesImage2(infoImagens[1].votos / (infoImagens[1].votos + infoImagens[0].votos + 1) * 100);
        console.log((infoImagens[0].votos +1)/ (infoImagens[1].votos + infoImagens[0].votos+1)*100,infoImagens[1].votos/(infoImagens[1].votos + infoImagens[0].votos+1)*100)
      } else {
        setVotesImage1(infoImagens[0].votos / (infoImagens[1].votos + infoImagens[0].votos + 1) * 100);
        setVotesImage2((infoImagens[1].votos + 1) / (infoImagens[1].votos + infoImagens[0].votos + 1) * 100);
        console.log(infoImagens[0].votos/ (infoImagens[1].votos + infoImagens[0].votos+1)*100,(infoImagens[1].votos+1)/(infoImagens[1].votos + infoImagens[0].votos+1)*100)
      }
    }

    setShowVoteBars(true);

    setTimeout(() => {
      buscarImagens();
      setShowVoteBars(false);
      setVotesImage1(0);
      setVotesImage2(0);
    }, 2000);
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
  }, [categoriasSelecionadas]);

  useEffect(() => {
    const updateVoteBars = () => {
      const image1Width = `${votesImage1}%`;
      const image2Width = `${votesImage2}%`;

      const imagem1Bar = document.querySelector('.image1-bar');
      const imagem2Bar = document.querySelector('.image2-bar');

      if (imagem1Bar) {
        imagem1Bar.style.width = image1Width;
      }

      if (imagem2Bar) {
        imagem2Bar.style.width = image2Width;
      }
    };

    updateVoteBars();
  }, [votesImage1, votesImage2]);

  const handleVoltar = () => {
    navigate(-1);
  };

  const linkStyle = {
    color: '#344648',
    textDecoration: 'none',
  };

  return (
    <div>
      <header className='wrapePrincipalHeader'>
        <nav className='NavBarPrincipal'>

        <Link className='TituloHeaderP' to="/pagina-inicial" style={linkStyle}>This or That - The Game</Link>
          <ul className='linksPrincipal'>
            <li><Link className='linksAuxPrincipal' to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link className='linksAuxPrincipal' to="/escolher-opcoes">Jogar</Link></li>
            <li><Link className ="linksAuxPrincipal" to="/ranking">Ranking</Link></li>
            <Link className="underPrincipal" to="/editar-perfil"  style={linkStyle}><Avatar src="/broken-image.jpg" /></Link>
          </ul>
        </nav>
      </header>

      <div>
        <main>
          <div className="box-images">
            <div className="botao-voltar-principal">
                    <button className='botao-voltar-principal-conteudo' onClick={handleVoltar}>Voltar</button>
            </div>
            {infoImagens.map((imagem, index) => (
              <div key={index} className="imagem-wrapper">
               
                {showVoteBars && (
                  <div
                    className={`imagem-vote-bar ${index === 0 ? 'image1-bar' : 'image2-bar'}`}
                    style={{ width: `${index === 0 ? votesImage1 : votesImage2}%` }}
                  ></div>
                )}
                <img
                  className="imagem-item"
                  alt="Imagem do Firebase Storage"
                  src={imagem.url}
                  onClick={() => handleImagemClick(imagem)}
                />
                <p className='imagem-descricao'>{imagem.descricao}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer className='bottomPrincipal'>
        <p>&copy; 2023 This or That - The Game. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default TelaPrincipal;
