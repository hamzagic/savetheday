import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import myImg from '../../assets/flying.svg';
import myText from '../../assets/lineartext.png';

import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const history = useHistory();

    function handleRegister(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        }
        console.log('Signup clicked', data);
    }

    return(
        <div className="register-container">
            <div className="page-content">
                <section>
                    <img src={myText} alt="save" />
                    <img src={myImg} alt="hero" style={{height: "200px", color:"#ff0054"}}/>
                    <h1>Register</h1>
                    <p>Create a new account and be visible so that people can help your shelter.</p>
                    <Link to="/login" className="back-link">
                        <FiArrowLeft size={16} color="#ff0054" />
                        Back to Login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="WhatsApp" 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    <div className="group-input">
                        <input 
                            type="text" 
                            placeholder="City" 
                            value={city}
                            onChange={e => setCity(e.target.value)}  
                        />
                        <input 
                            type="text" 
                            placeholder="State" 
                            style={{ width: 100 }} 
                            maxLength="2"
                            value={state}
                            onChange={e => setState(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="button">Register</button>
                </form>
            </div>
        </div>
    );
}