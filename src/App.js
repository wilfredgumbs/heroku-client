import React, {useState} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [Auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const signIn = ()=>{
      axios.get(`https://passport-upwork.herokuapp.com//auth/heroku`)
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
