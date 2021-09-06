import React from 'react';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { allNews } from './Data/Data';

const Home = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Header />
            <Main Data = {allNews} />
        </div>
    );
};

export default Home;