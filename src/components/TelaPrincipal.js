import React, { useState , useEffect} from 'react';
import '../styles/TelaPrincipal.css';
import { useNavigate, Link, useLocation} from 'react-router-dom';
//import { getStorage,ref,getDownloadURL,listAll } from "firebase/storage";
import { collection, query, where, orderBy, getDocs, limit, startAfter } from 'firebase/firestore';
import { db } from "../firebaseConnection";


function TelaPrincipal() {
  const location = useLocation();
  const categoriasSelecionadas = location.state?.categoriasSelecionadas || {};

  console.log(categoriasSelecionadas)

  

  /*
  const storage = getStorage();
  const imagesRef = ref(storage, 'gs://trabalhoprogweb-213bc.appspot.com/comidas/'); // Substitua com o caminho da sua pasta de imagens
  const imgElement = document.getElementById('sua-imagem');
  
  // Recupera todas as referências de imagem da pasta
  listAll(imagesRef)
    .then((res) => {
      // Seleciona uma referência de imagem aleatória
      const randomIndex = Math.floor(Math.random() * res.items.length);
      const randomImageRef = res.items[randomIndex];
  
      // Obtém a URL da imagem selecionada e a exibe no elemento <img>
      getDownloadURL(randomImageRef)
        .then((url) => {
          imgElement.src = url;
        })
        .catch((error) => {
          console.error('Erro ao obter a URL da imagem:', error);
        });
    })
    .catch((error) => {
      console.error('Erro ao recuperar as referências de imagem:', error);
    });

    */

  const [imagens, setImagens] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  
  useEffect(() => {
    const buscarImagensAleatorias = async () => {
      try {
        const imagensCollection = collection(db, 'imagens');
        let imagensQuery = query(imagensCollection);
  
        // Aplicar filtro por categoria, se selecionada
        if (categoriaFiltro !== '') {
          imagensQuery = query(imagensCollection, where('categoria', '==', categoriaFiltro));
        }
  
        imagensQuery = query(imagensQuery, orderBy('votos', 'desc'));
        
        // Obter o total de documentos na coleção
        const totalImagens = await getDocs(imagensQuery);
        const totalDocumentos = totalImagens.size;
  
        // Gerar dois números aleatórios entre 0 e o total de documentos - 1
        const indiceAleatorio1 = Math.floor(Math.random() * totalDocumentos);
        const indiceAleatorio2 = Math.floor(Math.random() * totalDocumentos);
  
        // Obter as duas imagens aleatórias
        const imagensSnapshot = await getDocs(
          query(imagensQuery, orderBy('votos', 'desc'), limit(2), startAfter(indiceAleatorio1))
        );
  
        const imagensData = imagensSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
  
        console.log(imagensData);
        setImagens(imagensData);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      }
    };
  
    buscarImagensAleatorias();    
  }, [categoriaFiltro]);
  
  const handleFiltrarCategoria = (categoria) => {
    setCategoriaFiltro(categoria);
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
        {imagens.map((imagem) => (
          <div key={imagem.id} style={{ marginRight: '10px' }}>
            <img
              src={imagem.img_ref}  // Supondo que 'url' seja a propriedade da imagem que contém o caminho da imagem
              alt={imagem.descricao} // Substitua 'nome' pela propriedade correta que contém o nome da imagem
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <p>{imagem.descricao}</p> {/* Substitua 'nome' pela propriedade correta que contém o nome da imagem */}
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
