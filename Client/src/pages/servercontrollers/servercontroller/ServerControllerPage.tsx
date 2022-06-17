import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { socket } from '../../../socket/socket';
import OptionButton from './components/OptionButton';
import Console from './options/Console';
import Dashboard from './options/Dashboard';
import './ServerControllerPageStyling.scss';

function ServerControllerPage(){
    const { serverid } = useParams();

    const [server, setServer] = useState<any>();
    const [selectedOption, setSelectedOption] = useState<any>(null);


    useEffect(function loadServer(){
        socket.emit("client:mcserver-get", serverid)
    }, []);
    useEffect(function updateServer(){
        socket.on(`server:mcserver-get`, data => {
            setServer(JSON.parse(data.JsonData))
        })
    }, []);
    useEffect(function checkServerDisabled(){
        if(server !== undefined){
            socket.on(`server:disable-server-${server.Address}`, () => {
                var updateServer:any = server;
                updateServer.State = false;
                setServer(updateServer);
            })
        }
    }, [server]);
    function handleOptionClick(selection: any){
        setSelectedOption(selection);
    }
    return (
        <div className='servercontroller'>
            <div className='servercontroller-options'>
                <div className='servercontroller-options-list'>
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
                    onClick={() => handleOptionClick(<Console Server={server} />)}
                />
                <OptionButton 
                    Title='Banned Players' 
                    Description="Een lijst met de spelers die eerder verbannen zijn van de server" 
                    onClick={() => handleOptionClick(<Console Server={server} />)}
                />
                <OptionButton 
                    Title='Whitelisted Players' 
                    Description="Een lijst met de spelers dat gewhitelist zijn op de server" 
                    onClick={() => handleOptionClick(<Console Server={server} />)}
                />
                <OptionButton 
                    Title='Plugins' 
                    Description="Al de plugins van de server zijn plugin folder en hun informatie" 
                    onClick={() => handleOptionClick(<Console Server={server} />)}
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
                </div>
            </div>
            <div className='servercontroller-panel'>
                {selectedOption === null ? <>Geen Optie geselecteerd!</> : selectedOption}
            </div>
        </div>
    );
}
export default ServerControllerPage;