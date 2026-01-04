import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
            <h1>404</h1>
            <p>This page is ghosted 👻</p>
            <Link to="/" style={{ color: '#3498db' }}>Go Home</Link>
        </div>
    );
};

export default NotFound;
