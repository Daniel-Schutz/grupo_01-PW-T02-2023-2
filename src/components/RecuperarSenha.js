import React, { useState } from 'react';
import '../styles/RecuperarSenha.css';
import { useNavigate } from 'react-router-dom';


function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulação do envio de solicitação de recuperação de senha
    // Você deve implementar a lógica real de envio de email no backend

    try {
      // Substitua esta parte com a lógica real de envio de email
      // Pode ser uma chamada de API para seu servidor
      // Aqui, apenas uma mensagem é exibida para simular o envio bem-sucedido
      setMensagem('Um email com instruções para recuperar sua senha foi enviado para ' + email);
      setEnviado(true);
    } catch (error) {
      console.error('Erro ao enviar email de recuperação de senha:', error);
      setMensagem('Ocorreu um erro ao enviar o email. Por favor, tente novamente mais tarde.');
    }
  };

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); 
  };

  return (
    <div>
      <h1>This or That - The Game</h1>
      {enviado ? (
        <p>{mensagem}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Digite seu email. Uma nova senha será enviada, e você poderá alterá-la depois.</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
          <div>
          <button onClick={handleVoltar}>Voltar</button>
        </div>
          {mensagem && <p>{mensagem}</p>}
        </form>
      )}

    </div>
  );
}

export default RecuperarSenha;
