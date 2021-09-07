import React from 'react';
import Header from '../Header/Header';

const LayOut = ({children}) => {
    return (
        <div style={{ display: 'flex' }}>
            <Header />
            {children}
        </div>
    );
};

export default LayOut;