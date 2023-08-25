import React from 'react';
import './home.css';
import UploadForm from '../upload/Upload';
import CockBanner from './CockBanner';
// import CockTitle from './CockTitle';
import Info from '../footer/Info';

const Home = () => {
    return (
        <div>
            {/* <CockTitle/> */}
            <CockBanner/>
            <UploadForm />
            <Info />
        </div>
    )
}

export default Home;