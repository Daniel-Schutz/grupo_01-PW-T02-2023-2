import React, { useState } from 'react';
import '../styles/EscolherOpcoes.css';
import { useNavigate, Link } from 'react-router-dom';

function EscolherOpcoes() {
  const initialCategories = {
    esportes: false,
    filmes: false,
    comidas: false,
    lugares: false,
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
    navigate("/tela-principal",{ state: { categoriasSelecionadas: categorias } })
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
            <li><Link to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link to="/escolher-opcoes">Jogar</Link></li>
            <li><Link to="/ranking">Ranking</Link></li>
          </ul>
        </nav>
        <h1 className='TituloHeader'>This or That - The Game</h1>
        <div className="usuario-editar">
          <p>Olá Usuário!</p>
          <p><Link to="/editar-perfil" className="underlink">Editar Perfil</Link></p>
        </div>
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
              <button className='Avancar' type="submit">
                Avançar
              </button>
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
