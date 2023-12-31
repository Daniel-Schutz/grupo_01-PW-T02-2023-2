import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConnection";
import Login from './components/Login';
import SignUp from './components/SignUp';
import RecuperarSenha from './components/RecuperarSenha';
import PaginaInicial from './components/PaginaInicial';
import EditarPerfil from './components/EditarPerfil';
import Ranking from './components/Ranking';
import TelaPrincipal from './components/TelaPrincipal';
import EscolherOpcoes from './components/EscolherOpcoes';
import { logout } from './firebaseConnection';

const PrivateRoute = ({ element }) => {
  const [user] = useAuthState(auth);
  return user ? element : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      logout();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/pagina-inicial" element={<PrivateRoute element={<PaginaInicial />} />} />
        <Route path="/editar-perfil" element={<PrivateRoute element={<EditarPerfil />} />} />
        <Route path="/ranking" element={<PrivateRoute element={<Ranking />} />} />
        <Route path="/tela-principal" element={<PrivateRoute element={<TelaPrincipal />} />} />
        <Route path="/escolher-opcoes" element={<PrivateRoute element={<EscolherOpcoes />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default AppRoutes;
