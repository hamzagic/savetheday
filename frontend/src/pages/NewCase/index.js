import React, { useState } from 'react';
import myText from '../../assets/lineartext.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import './styles.css';

export default function NewCase() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        console.log('button clicked', data);
    }
    return(
        <div className="new-case-container">
            <div className="content">
                <section>
                    <img src={myText} alt="saveIt" style={{ marginLeft: "24px" }} />
                    <h1>Create a new Case</h1>
                    <p>Describe the case and how people can help.</p>
                    <div>
                        <Link to="/cases" className="back-link">
                            <FiArrowLeft size={16} color="#ff0054" />
                            Back to Home
                        </Link>
                    </div>
                </section>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        type="text" 
                        placeholder="Description" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="How to help" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <input type="submit" className="button" value="Create Case"/>
                </form>
            </div>
        </div>
    );
}