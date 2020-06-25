import React,{ useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    }).catch((error)=>{
    })
  },[]);




  async function handleAddRepository() {
    try {
        const response = await api.post('/repositories',
        {
          title:"Desafio ReactJS",
          url:"https://github.com/josepholiveira",
          techs:["React", "Node.js"]
        }
      );
        const repository = response.data;
        setRepositories([...repositories,repository]);
     
      } catch{
        console.log('Error inserting the repository');
      }

  }

  async function handleRemoveRepository(id) {
    try {
      
      const response = await api.delete(`/repositories/${id}`);
      const repositoryNew = repositories.filter(repository => repository.id !== id); 
      setRepositories([...repositoryNew]);
    } catch (error) {
      console.log('Erro delete the repository');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return(
              <>
              <li key={repository.id} >
              {repository.title}
    
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            </>
            )
          })
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
