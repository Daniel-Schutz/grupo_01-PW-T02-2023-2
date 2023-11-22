import React, { useState} from 'react';
import '../styles/TelaPrincipal.css';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import { db } from "../firebaseConnection";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function TelaPrincipal() {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [larguraBarra, setLarguraBarra] = useState(0); // Renomeada para larguraBarra
  const location = useLocation();
  const categoriasSelecionadas = location.state?.categoriasSelecionadas || {};

  console.log(categoriasSelecionadas)

  const handleImagemClick = (imagem) => {
    buscarImagens();
    setImagemSelecionada(imagem);
    setLarguraBarra(50); // Defina a largura da barra aqui (50% como exemplo)
  };

  const selecionarImagem = (caminhoDaImagem) => {
    const storage = getStorage();
    const imageRef = ref(storage, caminhoDaImagem);
  
    return getDownloadURL(imageRef)
      .then((url) => {
        return url; // Retorna a URL da imagem obtida
      })
      .catch((error) => {
        // Trata qualquer erro que possa ocorrer ao recuperar a URL da imagem
        console.error('Erro ao obter a URL da imagem:', error);
        throw error; // Lança o erro para ser tratado externamente, se necessário
      });
  };

  const buscarImagens = async () => {
    try {
        const imagensCollection = collection(db, 'imagens');
        let imagensQuery = query(imagensCollection);
     
        const categoriasSelecionadasRef = categoriasSelecionadas;
    
        // Filtrar apenas as categorias que são true
        const categoriasAtivas = Object.keys(categoriasSelecionadasRef).filter(
          categoria => categoriasSelecionadasRef[categoria]
        );
          console.log(categoriasAtivas)
          imagensQuery = query(imagensCollection, where('categoria', 'in', categoriasAtivas));
        console.log(imagensQuery)

        const imagensSnapshot = await getDocs(imagensQuery);
    
        const imagens = imagensSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log(imagens)
  
 
      const imagensPorCategoria = {};
  
      imagens.forEach(imagem => {
        if (!imagensPorCategoria[imagem.categoria]) {
          imagensPorCategoria[imagem.categoria] = [];
        }
        imagensPorCategoria[imagem.categoria].push(imagem);
      });
  
      // Selecionar aleatoriamente duas imagens da mesma categoria
      const categorias = Object.keys(imagensPorCategoria);
      const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
      const imagensDaCategoria = imagensPorCategoria[categoriaAleatoria];
  
      // Garantir que há pelo menos duas imagens na categoria selecionada
      if (imagensDaCategoria.length >= 2) {
        const indicesAleatorios = [];
  
        while (indicesAleatorios.length < 2) {
          const indiceAleatorio = Math.floor(Math.random() * imagensDaCategoria.length);
          if (!indicesAleatorios.includes(indiceAleatorio)) {
            indicesAleatorios.push(indiceAleatorio);
          }
        }
  
        const imagensSelecionadas = indicesAleatorios.map(indice => imagensDaCategoria[indice]);
        const linksImagens = imagensSelecionadas.map(imagem => imagem.img_ref);
  
        console.log('Links das imagens selecionadas:', linksImagens);

            selecionarImagem(linksImagens[0])
      .then((url) => {
        // Use a URL da imagem para exibi-la em um elemento <img>
        const imgElement = document.getElementById('imagem1');
        imgElement.src = url;
      })
      .catch((error) => {
        // Trate o erro ao obter a URL da imagem aqui, se necessário
        console.error('Erro ao obter a URL da imagem:', error);
      });

          selecionarImagem(linksImagens[1])
      .then((url) => {
        // Use a URL da imagem para exibi-la em um elemento <img>
        const imgElement = document.getElementById('imagem2');
        imgElement.src = url;
      })
      .catch((error) => {
        // Trate o erro ao obter a URL da imagem aqui, se necessário
        console.error('Erro ao obter a URL da imagem:', error);
      });


      } else {
        console.log('Não há imagens suficientes nessa categoria.');
      }
  
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

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
          <img id="imagem1" className="imagem-item" alt="Imagem do Firebase Storage" onClick={handleImagemClick} />
          <img id="imagem2" className="imagem-item" alt="Imagem do Firebase Storage" onClick={handleImagemClick} />
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