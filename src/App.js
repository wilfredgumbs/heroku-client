import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [Auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const signIn = () => {
        axios.get(`https://passport-upwork.herokuapp.com/auth`)
            .then(res => {
                const url = res.data;
                window.location.assign(url);
            })
    };
    const refresh = () => {
        axios.get(`https://passport-upwork.herokuapp.com/refresh?refresh_token=${token.refresh_token}`)
            .then(res => {
               setToken(res.data);
            })
    };
    useEffect(() => {
        if (!Auth) {
            try {
                axios.get('https://passport-upwork.herokuapp.com/userData')
                    .then(function (response) {
                        console.log(response);
                        if (typeof response.data === 'object') {
                            setToken(response.data);
                            axios.get('https://api.heroku.com/account', {
                                headers: {
                                    "Authorization": `Bearer ${response.data.access_token}`,
                                    'Accept': 'application/vnd.heroku+json; version=3'
                                }
                            }) .then(res => {
                                // setAuth(true)
                                console.log(res.data);
                                setUser(res.data);
                                setAuth(true)
                            })
                        }
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
                        {user.name }
                        <br/>
                        {user.email}
                        <br/>
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
