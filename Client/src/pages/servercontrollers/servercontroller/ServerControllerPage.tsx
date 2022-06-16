import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { socket } from '../../../socket/socket';
import OptionButton from './components/OptionButton';
import Console from './options/Console';
import './ServerControllerPageStyling.scss';

function ServerControllerPage(){
    const { serverid } = useParams();

    const [server, setServer] = useState<any>({});
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
        socket.on(`server:disable-server-${server.Address}`, () => {
            setServer(null);     
        })
    }, [server]);
    function handleOptionClick(selection: any){
        setSelectedOption(selection);
    }
    if(server === null){
        return <Navigate to='/controller/servers' />
    } else {
        return (
            <div className='servercontroller'>
                <div className='servercontroller-options'>
                    <OptionButton 
                        Title='Server Console' 
                        Description="Krijg de console van de server te zien waarmee je interactie's kunt doen" 
                        onClick={() => handleOptionClick(<Console />)}
                    />
                </div>
                <div className='servercontroller-panel'>
                    {selectedOption === null ? <>Geen Optie geselecteerd!</> : selectedOption}
                </div>
            </div>
        );
    }
}
export default ServerControllerPage;