import { useParams } from "react-router-dom";
import NavTab from "./NavTab";
import './SettingSelectorStyle.scss';

function SettingSelector(){
    let { serverid } = useParams();
    return (
        <div className="settingselector">
            <div className='settingselector-buttons'>
                <NavTab 
                    title='Player Settings' 
                    description='Pas de instellingen van de spelers op de server aan' 
                    path={'/controller/servers/edit/player/' + serverid}
                />
                <NavTab 
                    title='Server Settings' 
                    description='Voer verschillende acties uit op de server' 
                    path={'/controller/servers/edit/server/' + serverid}
                />
                <NavTab 
                    title='Extra Settings' 
                    description='Bekijk de verschillende extra instellingen' 
                    path={'/controller/servers/edit/extra/' + serverid}
                />
                <NavTab 
                    title='Logging Panel' 
                    description='Bekijk het netwerk verkeer van de server' 
                    path={'/controller/servers/logging/' + serverid}
                />
            </div>
        </div>
    );
}
export default SettingSelector;