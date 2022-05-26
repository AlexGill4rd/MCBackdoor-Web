import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';

import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

import './styling/ServerTab.scss';

function ServerTab(props: {server: any;}){
    const [serverImage, setServerImage] = useState(props.server.Image);
    const [serverName, setServerName] = useState(props.server.Name);
    const [serverState, setServerState] = useState(props.server.State);
    const [serverID, setServerID] = useState(props.server.id);
    const [serverMOTD, setServerMOTD] = useState(props.server.MOTD);
    const [serverMax, setServerMax] = useState(props.server.MaxPlayers);
    const [serverOnlineP, setServerOnlineP] = useState(props.server.OnlinePlayers);
    const [serverVersion, setServerVersion] = useState(props.server.Version);

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
            <div className='servertab-players'>{serverOnlineP + " / " + serverMax}</div>
            <div className='servertab-verticalline'>|</div>
            <Link to={'/controller/servers/' + serverID}>
                <Button className='servertab-beheren' variant="contained" >
                    Beheren
                </Button>
            </Link>
            <div className='servertab-verticalline'>|</div>
            {serverState ?
                <div className='servertab-state' style={{color: 'lime'}}><FaCheckCircle /></div> :
                <div className='servertab-state' style={{color: 'red'}}><FaMinusCircle /></div>
            }
        </div>
    );
}
export default ServerTab;