import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router
import '../styles/EscolherOpcoes.css';

function EscolherOpcoes() {
  const [categorias, setCategorias] = useState({
    esportes: false,
    música: false,
    filmes: false,
    comida: false,
    viagens: false,
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

  return (
    <div>
      <h1>Editar Opções</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
        <Link to="/tela-principal">
          <button type="submit">Salvar Opções</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EscolherOpcoes;
