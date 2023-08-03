import React from 'react';
import './home.css';
import SearchBar from '../../search/Search';
import Upload from '../upload/PictureUpload';
import Info from '../footer/Info';
import SpeedDialTooltipOpen from '../menu/Menu';

const Home = () => {
    return (
        <div>
            <SearchBar />
            <Upload />
            <SpeedDialTooltipOpen />
            <Info />
        </div>
    )
}

export default Home;