import { Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

import './styling/ServerTab.scss';

function ServerTab(props: {server: any;}){
    const [serverImage, setServerImage] = useState(JSON.parse(props.server.Image).Image);
    const [serverName, setServerName] = useState(props.server.Name);
    const [serverState, setServerState] = useState(props.server.State);
    const [serverID, setServerID] = useState(props.server.id);
    const [serverMOTD, setServerMOTD] = useState(props.server.MOTD);
    const [serverMax, setServerMax] = useState(props.server.MaxPlayers);
    const [serverOnlineP, setServerOnlineP] = useState(props.server.OnlinePlayers);
    const [serverVersion, setServerVersion] = useState(props.server.Version);
    
    useEffect(function updateData(){
        setServerImage(JSON.parse(props.server.Image).Image)
        setServerName(props.server.Name)
        setServerState(props.server.State)
        setServerID(props.server.id)
        setServerMOTD(props.server.MOTD)
        setServerMax(props.server.MaxPlayers)
        setServerOnlineP(props.server.OnlinePlayers)
        setServerVersion(props.server.Version)
    }, [props.server]);

    return (
        <div className="servertab">
            <div className='servertab-id'>{serverID}</div>
            <div className='servertab-verticalline'>|</div>
            <Tooltip title={serverVersion}>
                <div className='servertab-image'><img src={serverImage} /></div>
            </Tooltip>
            <div className='servertab-verticalline'>|</div>
            <Tooltip title={serverMOTD}>
                <div className='servertab-ip'>{serverName}</div>
            </Tooltip>
            <div className='servertab-verticalline'>|</div>
            <div className='servertab-players'>{serverOnlineP === undefined ? "- / " + serverMax : serverOnlineP + " / " + serverMax}</div>
            
            {serverState === 1 ?
                <>
                    <div className='servertab-verticalline'>|</div>
                    <Link to={'/controller/servers/' + serverID}>
                        <Button className='servertab-beheren' variant="contained" >
                            Beheren
                        </Button>
                    </Link>
                </> : 
                <></>
            }
            <div className='servertab-verticalline'>|</div>
            {serverState === 1 ?
                <Tooltip title="Server OFF!"><div className='servertab-state' style={{color: 'lime'}}><FaCheckCircle /></div></Tooltip> :
                <Tooltip title="Server ON!"><div className='servertab-state' style={{color: 'red'}}><FaMinusCircle /></div></Tooltip>
            }
        </div>
    );
}
export default ServerTab;