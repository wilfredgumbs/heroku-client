import React, {useState} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [Auth, setAuth] = useState(false);

  const signIn = ()=>{
      axios.get(`http://127.0.0.1:5000/auth/heroku`)
          .then(res => {
              const persons = res.data;
              console.log(persons);
          })
  };

  return (
    <div className="App">
      <header className="App-header">

        {Auth ? (
            ""
        ) : (
            <button onClick={signIn}>
          login with heroku
          </button>
        )}



      </header>
    </div>
  );
}

export default App;
