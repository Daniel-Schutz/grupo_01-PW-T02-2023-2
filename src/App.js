import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecuperarSenha from './components/RecuperarSenha';
import PaginaInicial from './components/PaginaInicial';
import EditarPerfil from './components/EditarPerfil';
import Ranking from './components/Ranking';
import TelaPrincipal from './components/TelaPrincipal';
import EscolherOpcoes from './components/EscolherOpcoes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/pagina-inicial" element={<PaginaInicial />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/tela-principal" element={<TelaPrincipal />} />
        <Route path="/escolher-opcoes" element={<EscolherOpcoes />} />
      </Routes>
    </Router>
  );
}

export default App;
