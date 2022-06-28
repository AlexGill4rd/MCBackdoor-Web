import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../globaltsx/Header';
import ServerList from './components/ServerList';

import './styling/ServerPageStyling.scss';

function ServerPage(){

    return (

        <div className="serverpage-container">
            <Tooltip title="Ga terug naar vorige pagina!">
                <Link to='/controller/homepage'>
                    <h1>Server Lijst</h1>
                </Link>
            </Tooltip>
            <ServerList />
        </div>
    );
}
export default ServerPage;