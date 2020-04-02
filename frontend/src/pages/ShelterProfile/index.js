import React, { useState } from 'react';
import myImg from '../../assets/flying.svg';
import myText from '../../assets/lineartext.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

export default function ShelterProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    function handleUpdate(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        }
        console.log('button clicked', data);
    }
    return(
        <div className="profile-container">
            <div className="content">
                <section>
                    <img src={myText} alt="saveIt"/>
                    <img src={myImg} alt="hero" style={{height: "200px"}}/>
                    <p>
                        <Link to="/cases" className="back-link">
                            <FiArrowLeft size={16} color="#ff0054" /> 
                            Back to Home
                        </Link>
                    </p>
                </section>
                <form onSubmit={handleUpdate}>
                    <h1>Profile</h1>
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
                        placeholder="Whatsapp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    /> 
                    <input 
                        type="text" 
                        placeholder="City" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    /> 
                    <input 
                        type="text" 
                        placeholder="State" 
                        maxLength="2" 
                        value={state}
                        onChange={e => setState(e.target.value)}
                    /> 
                    <input type="submit" className="button" value="Update" />
                </form>
            </div>
        </div>
    );
}