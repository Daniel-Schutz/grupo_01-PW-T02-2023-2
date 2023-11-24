import React, { useState } from 'react';
import '../styles/EscolherOpcoes.css';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

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
    const isAnyCategorySelected = Object.values(categorias).some((value) => value === true);
  
    if (isAnyCategorySelected) {
      navigate("/tela-principal", { state: { categoriasSelecionadas: categorias } });
    } else {
      // Aqui você pode exibir uma mensagem para o usuário informando que pelo menos uma opção deve ser selecionada
      alert("Selecione pelo menos uma opção.");
    }
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };
  const linkStyle = {
    color: '#344648',
    textDecoration: 'none',
  };


  return (
    <div>
        <header className='headerEscOp'>
        <div className='NavBarEscOp'>
          <Link className='TitleTheGame' to="/pagina-inicial" style={linkStyle}>This or That - The Game</Link>
          <ul className='linksEscOp'>
            <li><Link className='linksEscOpAux' to="/pagina-inicial">Página Inicial</Link></li>
            <li><Link className='linksEscOpAux' to="/ranking">Ranking</Link></li>
            <li><Link className="under" to="/editar-perfil"  style={linkStyle}><Avatar src="/broken-image.jpg" /></Link></li>
          </ul>
          </div>
      </header>
    
      <main className='corpoMain'>
        <form onSubmit={handleSubmit}>
          <div className='formChooseOpt'>
            <h3 className='choseOptions'>Marque aleatório ou escolha suas categorias :</h3>
            <div>
              <label>
                <input className='inputAl'
                  type="checkbox"
                  name="aleatorio"
                  checked={categorias.aleatorio}
                  onChange={handleChange}
                />
                Aleatório
              </label>
            </div>
            {categoriesList.map((category) => (
              <div key={category}>
                <label>
                  <input className='inputAl'
                    type="checkbox"
                    name={category}
                    checked={categorias[category]}
                    onChange={handleChange}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          <div className='buttonDisplay'>
          <button className='botoesCateg' onClick={handleVoltar}>Voltar</button>
            <button className='botoesCateg' type="submit">
              Avançar
            </button>
          </div>
          </div>
        </form>
      </main>

      <footer className='bottomEscOp'>
        <p>&copy; 2023 This or That - The Game. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default EscolherOpcoes;
