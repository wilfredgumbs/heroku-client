import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [Auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const signIn = () => {
        axios.get(`http://127.0.0.1:5000/auth`)
            .then(res => {
                const url = res.data;
                window.location.assign(url);
            })
    };
    const refresh = () => {
        axios.post(`http://127.0.0.1:5000/refresh`, {
            code: token,
        })
            .then(res => {
                const token = res.data;
            })
    };
    useEffect(() => {
        if (!Auth) {
            try {
                let code = window.location.href.split("=")[1].split("&")[0];
                axios.post('http://127.0.0.1:5000/token', {
                    code: code,
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log("yes", error);
                    });
            } catch (e) {
                return

            }

        }
    }, [Auth]);
    return (
        <div className="App">
            <header className="App-header">

                {Auth ? (
                    <div>
                        {user}
                        <button onClick={refresh}>
                            refresh
                        </button>
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
