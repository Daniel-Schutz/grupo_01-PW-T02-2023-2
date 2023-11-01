import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EscolherOpcoes.css';
import { useNavigate } from 'react-router-dom';

function EscolherOpcoes() {
  const initialCategories = {
    aleatorio: false,
    esportes: false,
    música: false,
    filmes: false,
    comida: false,
    viagens: false,
    animais: false,
  };

  const [categorias, setCategorias] = useState(initialCategories);

  const categoriesList = Object.keys(initialCategories);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'aleatorio') {
      // If the "Aleatório" checkbox is clicked, toggle all other checkboxes
      const updatedCategories = { ...categorias };
      for (const category of categoriesList) {
        if (category !== 'aleatorio') {
          updatedCategories[category] = checked;
        }
      }
      setCategorias(updatedCategories);
    } else {
      setCategorias({
        ...categorias,
        [name]: checked,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to send selected categories to the server
    console.log('Categorias selecionadas:', categorias);
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div>
      <header>
        {/* Header content */}
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Marque aleatório ou escolha suas categorias:</h1>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="aleatorio"
                  checked={categorias.aleatorio}
                  onChange={handleChange}
                />
                Aleatório
              </label>
            </div>
            {categoriesList.slice(1).map((category) => (
              <div key={category}>
                <label>
                  <input
                    type="checkbox"
                    name={category}
                    checked={categorias[category]}
                    onChange={handleChange}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
          <div className='Botoes'>
            <button onClick={handleVoltar}>Voltar</button>
            <Link to="/tela-principal">
              <button className='Avancar' type="submit">
                Avançar
              </button>
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
