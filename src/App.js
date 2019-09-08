import React, {useState} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [Auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = ()=>{
      axios.get(`http://127.0.0.1:5000/auth/heroku`)
          .then(res => {
              setAuth(true)
              const persons = res.data;
              setUser(persons);
          })
  };

  return (
    <div className="App">
      <header className="App-header">

        {Auth ? (
          <div>
              {user}
          </div>
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
