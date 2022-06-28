import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import ServerList from './components/ServerList';

import './styling/ServerPageStyling.scss';

function ServerPage(){

    return (

        <div className="serverpage-container">
            <Link to='/controller/homepage'>
                <Tooltip title="Ga terug naar vorige pagina!">
                        <h1>Server Lijst</h1>
                </Tooltip>
            </Link>
            <ServerList />
        </div>
    );
}
export default ServerPage;