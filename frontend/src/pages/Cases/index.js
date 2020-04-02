import React from 'react';
import myText from '../../assets/lineartext.png';
import { FiPower, FiUser, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Cases() {
    return(
        <div className="cases-container">
            <header>
                <img src={myText} style={{height: "100px"}} alt="saveIt"/>
                <span>Welcome, Shelter</span>
                <button className="left newCase" style={{maxWidth: "200px", letterSpacing: "0em", marginTop: "-2px"}}>Create New Case</button>
                <button className="profile-btn">
                    <FiUser size={15} style={{marginRight: "8px"}} />
                    Profile
                </button>
                <button className="btn">
                    <FiPower size={16} />
                    Logout
                </button>
            </header>
            <h1>Registered Cases</h1>
            <ul>
                <li>
                    <strong>CASE:</strong>  
                    <p>Kitties on the street</p>

                    <strong>DESCRIPTION:</strong>  
                    <p>We need to take the kitties to the vet.</p>

                    <strong>VALUE:</strong>  
                    <p>Any value will help!</p>
                    <button className="delete">
                        <FiTrash2 size={20} /> 
                    </button>
                </li>
            </ul>
            
        </div>
    );
}