import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './PanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function OperatorPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    function setPlayerOpStatus(status: boolean){
        var data = {
            Player: props.player,
            Feature: "OP",
            Status: status
        }
        socket.emit("client:features-change", data);
    }
    useEffect(function listenMessages(){
        socket.on(`server:features-change-message`, data => {
            if (data.includes("fout"))setError(true);
            else setError(false);
            setInfoMessage(data);
        })
    }, []);
    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }
    return (
        <>
            <div className='panel-header'>
                Operator Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='operatorpanel-container'>
                <div className='operatorpanel-buttons'>
                    <Tooltip title='Geef de geselecteerde speler operator' onClick={() => setPlayerOpStatus(true)}>
                        <div className='operatorpanel-buttons-button'>Geef Operator</div>
                    </Tooltip>
                    <Tooltip title='Haal de operator bij de speler weg' onClick={() => setPlayerOpStatus(false)}>
                        <div className='operatorpanel-buttons-button'>Neem Operator Weg</div>
                    </Tooltip>
                </div>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default OperatorPanel;