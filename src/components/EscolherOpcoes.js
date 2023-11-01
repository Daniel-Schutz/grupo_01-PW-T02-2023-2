import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import '../styles/EscolherOpcoes.css';
import { useNavigate } from 'react-router-dom';


function EscolherOpcoes() {
  const [categorias, setCategorias] = useState({
    esportes: false,
    música: false,
    filmes: false,
    comida: false,
    viagens: false,
    animais: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCategorias({
      ...categorias,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione a lógica para enviar as opções de categorias selecionadas para o servidor
    console.log('Categorias selecionadas:', categorias);
  };

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
      
    <form onSubmit={handleSubmit}>
        <div>
          <h1>Marque aleatório ou escolha suas categorias:</h1>
          <label>
            <input
              type="checkbox"
              name="esportes"
              checked={categorias.esportes}
              onChange={handleChange}
            />
            Esportes
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="música"
              checked={categorias.música}
              onChange={handleChange}
            />
            Música
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="filmes"
              checked={categorias.filmes}
              onChange={handleChange}
            />
            Filmes
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="comida"
              checked={categorias.comida}
              onChange={handleChange}
            />
            Comida
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="viagens"
              checked={categorias.viagens}
              onChange={handleChange}
            />
            Viagens
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="animais"
              checked={categorias.animais}
              onChange={handleChange}
            />
            Animais
          </label>
        </div>
        <div className='Botoes'>
          <button onClick={handleVoltar}>Voltar</button>
          <Link to="/tela-principal">
          <button className='Avancar' type="submit">Avançar</button>
          </Link>
        </div>
      
        
      </form>

    </main>

    <footer>
        <p>&copy; 2023 Minha Empresa. Todos os direitos reservados.</p>
    </footer>
    </div>
  );
}

export default EscolherOpcoes;
