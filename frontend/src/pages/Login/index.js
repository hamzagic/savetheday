import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';

import myText from '../../assets/lineartext.png';
import myImg from '../../assets/flying.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            password
        }
        console.log('login clicked', data);
    }
    return(
        <div className="login-container">
            <div className="page-content">
                <section>
                    <h1>Shelter Login</h1>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <button type="submit" className="button">Login</button>
                    </form>
                    <Link to="/" className="back-link">
                    <FiLogIn size={16} color="#ff0054" />
                    No account? Register here
                    </Link>
                </section>  
            </div>
            <div className="img-content">
                <img src={myText} alt="logo "/>
                <img src={myImg} alt="Hero" style={{height: "200px"}} />
            </div>
        </div>
    );
}