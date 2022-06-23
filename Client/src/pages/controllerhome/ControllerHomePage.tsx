import React from 'react';
import NavTab from '../settingselectorpage/NavTab';

import './styling/ControllerHomePageStyling.scss';

function ControllerHomePage(){

    return (
        <div className="controllerhome-container">
            <div className='controllerhome-buttons'>
                <NavTab 
                    title='Statistics' 
                    description='Bekijk de statiestieken over de data' 
                    path='/controller/servers'
                />
                <NavTab 
                    title='Servers' 
                    description='Bekijk al de servers waar de plugin zich in bevindt' 
                    path='/controller/servers'
                />
                <NavTab 
                    title='Updater' 
                    description='Update de plugin.' 
                    path='/controller/servers'
                />
            </div>
        </div>
    );
}
export default ControllerHomePage;