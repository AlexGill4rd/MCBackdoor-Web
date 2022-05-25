import React from 'react';
import Header from '../../globaltsx/Header';
import ServerList from './components/ServerList';

import './styling/ServerPageStyling.scss';

function ServerPage(){

    return (
        <>
            <Header title='Servers' path='/controller/homepage' />
            <div className="serverpage-container">
                <ServerList />
            </div>
        </>
    );
}
export default ServerPage;