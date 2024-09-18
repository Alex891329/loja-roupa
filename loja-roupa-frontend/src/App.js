import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [tipo, setTipo] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://vigilant-invention-7v9jwjqg7w7p3x6q5-3001.app.github.dev/add-roupa', {
        nome,
        tamanho,
        tipo,
        preco
      });

      alert(response.data.message);
      setNome('');
      setTamanho('');
      setTipo('');
      setPreco('');
    } catch (error) {
      console.error('Erro ao cadastrar a roupa:', error);
      alert('Erro ao cadastrar a roupa. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="App">
      <h1>Cadastro de Roupas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tamanho:</label>
          <input
            type="text"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
