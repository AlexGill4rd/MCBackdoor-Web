import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimplePopup from '../../../globaltsx/SimplePopup';
import IpAddress from '../../../IpAddress';
import { socket } from '../../../socket/socket';
import OptionButton from './components/OptionButton';
import BannedPlayers from './options/BannedPlayers';
import Console from './options/Console';
import Dashboard from './options/Dashboard';
import Files from './options/Files';
import Whitelist from './options/Whitelist';
import './ServerControllerPageStyling.scss';

function ServerControllerPage(){
    const { serverid } = useParams();

    const [server, setServer] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<any>(null);

    useEffect(() => {
        function loadServer(){
            var ip = new IpAddress();
            fetch(`http://${ip.getIP()}:8080/server/get`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({serverid: serverid, token: "6969"})
            }).then(res => res.json())
            .then(json => {
                setServer(json);
            });
        }
        function serverDisconnects(){
            socket.on(`server:disable-server-${serverid}`, data => {
                setServer(data)
            })
        }
        function listenPopups() {
            socket.on(`feature:serverpanel-log`, (message, type, error) => {
                handlePopup(message, type, error)
            });
        }
        loadServer();
        serverDisconnects();
        listenPopups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function handleOptionClick(selection: any){
        setSelectedOption(selection);
    }
    //POPUP SYSTEM
    const [popups, setPopUps] = useState<any[]>([]);
    function handlePopup(message: string, severity: string, error: string){
        var popup = {
            Title: "Server Controller",
            Description: message,
            Severity: severity
        }
        setPopUps((popups:any) => [...popups, popup]);
    };
    return (
        <div className='servercontroller'>
            <div className='servercontroller-options'>
                <div className='servercontroller-options-list'>
                    {server !== null ? 
                        <>
                            <OptionButton 
                                Title='Dashboard' 
                                Description="Het dashboard van de server met interessante functies en informatie" 
                                onClick={() => handleOptionClick(<Dashboard Server={server} />)}
                            />
                            <OptionButton 
                                Title='Console' 
                                Description="De console van de server waar al de logs binnen komen" 
                                onClick={() => handleOptionClick(<Console Server={server} />)}
                            />
                            <OptionButton 
                                Title='Files' 
                                Description="De files van de server die zich bevinden in de root folder van de server" 
                                onClick={() => handleOptionClick(<Files Server={server} />)}
                            />
                            <OptionButton 
                                Title='Banned Players' 
                                Description="Een lijst met de spelers die eerder verbannen zijn van de server" 
                                onClick={() => handleOptionClick(<BannedPlayers Server={server} />)}
                            />
                            <OptionButton 
                                Title='Whitelisted Players' 
                                Description="Een lijst met de spelers dat gewhitelist zijn op de server" 
                                onClick={() => handleOptionClick(<Whitelist Server={server} />)}
                            />
                            <OptionButton 
                                Title='Worlds' 
                                Description="De werelden waaruit de server bestaadt en hun informatie" 
                                onClick={() => handleOptionClick(<Console Server={server} />)}
                            />
                            <OptionButton 
                                Title='Broadcasting' 
                                Description="Optie om over de server een broadcast te doen" 
                                onClick={() => handleOptionClick(<Console Server={server} />)}
                            />
                        </> : 
                        <CircularProgress />
                    }
                </div>
            </div>
            <div className='servercontroller-panel'>
                {selectedOption === null ? <>Geen Optie geselecteerd!</> : selectedOption}
            </div>
            {popups.map((item, i) => {
                return (
                    <SimplePopup key={i} Title={item.Title} Description={item.Description} Severity={item.Severity}/>
                );
            })}
        </div>
    );
}
export default ServerControllerPage;