import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import { DiGithubBadge } from "react-icons/di";
import { FiLinkedin } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";
import Logo from './mapa.svg';
import './main.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function buscar() {
    // 11015070/json/
    
    if(input === '') {
      alert('Por favor, Digite um cep!')
      return;
    }
    
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{

      alert('Ops! Cep Inexistente!')
      setInput("")

    }
  }

  return (
  <div className="container">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <a href="https://github.com/AldemirMoraisDeveloper" target="_blank">
          <DiGithubBadge className="github"/>
        </a>
        <a href="https://www.linkedin.com/in/aldemir-morais-144ab21b9/" target="_blank">
          <FiLinkedin className="linkedin"/>
        </a>
        <a href="https://www.instagram.com/aldemir.dev/" target="_blank">
          <FiInstagram className="instagram"/>
        </a>
        <a href="https://www.facebook.com/Aldemir.FerreiraM/" target="_blank">
          <FiFacebook className="facebook"/>
        </a>
      </header>
      <h1 className="title">Buscar CEP</h1>

      <div className="containerInput">
         <input 
         type="text"
         placeholder= "Digite um cep..."   
         value={input}
         onChange={(event) => setInput(event.target.value) }    
         />

        <button className="btnSearch" onClick={buscar}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div> 

      {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
    
  </div>
  );
}

export default App;
