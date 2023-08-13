import React from 'react';
import './home.css';
// import SearchBar from '../search/Search'
import Upload from '../upload/PictureUpload';
import Info from '../footer/Info';

const Home = () => {
    return (
        <div>
            {/* <SearchBar /> */}
            <Upload />
            <Info />
        </div>
    )
}

export default Home;