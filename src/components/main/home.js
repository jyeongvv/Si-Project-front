import React from 'react';
import './home.css';
// import SearchBar from '../search/Search'
import UploadForm from '../upload/Upload';
import Info from '../footer/Info';

const Home = () => {
    return (
        <div>
            {/* <SearchBar /> */}
            <UploadForm />
            <Info />
        </div>
    )
}

export default Home;