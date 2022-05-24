import React from 'react';
import { Link } from 'react-router-dom';

import './styling/HomePageStyling.scss';

function HomePage(){

    return (
        <div className="homepage-container">
            <div className='homepage-buttons'>
                <Link to='/controller/homepage'>
                    <div className='homepage-buttons-home'>
                        <div className='homepage-buttons-home-title'>Home</div>                  
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default HomePage;