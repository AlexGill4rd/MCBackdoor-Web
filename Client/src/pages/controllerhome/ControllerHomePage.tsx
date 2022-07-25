import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import NavTab from '../settingselectorpage/NavTab';

import './styling/ControllerHomePageStyling.scss';

function ControllerHomePage(){

    return (
        <div className="controllerhome-container">
            <Link to='/'>
                <Tooltip title="Ga terug naar vorige pagina!">
                    <h1>Selecteer één van de optie's om verder te gaan!</h1>
                </Tooltip>
            </Link>
            <div className='controllerhome-buttons'>
                <NavTab 
                    title='Statistics' 
                    description='In deze tab kan je als beheerder al de statistieken van de plugins bekijken. Zo kan je zien in welke server de plugin zich op dit moment bevindt en waar welke versie aanwezig is. Om meer informatie te zien kan je hierop klikken!' 
                    path='/controller/servers'
                    image='/icons/controllerpage/statistics.png'
                />
                <NavTab 
                    title='Servers' 
                    description='Indien je wenst de servers te beheren kan je je naar deze tab navigeren. Je zal een lijst ontvangen met al de actieve servers en diegene die jij kan beheren. Wens je verder te gaan? Klik dan op deze tab.' 
                    path='/controller/servers'
                    image='/icons/controllerpage/servers.png'
                />
                <NavTab 
                    title='Updater' 
                    description='Wil je graag een nieuwere versie van de plugin in al de servers uploaden kan dat via dit menu. Je zal je nieuwe jar kunnen uploaden en de jar verzenden naar al de servers die op dat moment verbonden zijn met de server.' 
                    path='/controller/servers'
                    image='/icons/controllerpage/updater.png'
                />
            </div>
        </div>
    );
}
export default ControllerHomePage;