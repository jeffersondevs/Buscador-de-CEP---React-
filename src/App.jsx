import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    //01310930/json/ - cep

    if (input === '') {
      alert("Preencha algum CEP!")
      return;
    }

    //requisição assincrona
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('');

    } catch {
      alert("Ops, erro ao buscar");
      setInput('') //limpar o campo do input para vazio 
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />


        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

     
      {Object.keys(cep).length > 0 && (      //verificando se tem alguma propriedade dentro do objeto
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}


    </div>
  )
}

export default App
