import { Button } from '@mui/material';
import React, { useState } from 'react';

import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

import './styling/ServerTab.scss';

function ServerTab(props: {serverImage: string, serverName: string, serverState: boolean, serverID: number}){
    const [serverImage, setServerImage] = useState(props.serverImage);
    const [serverName, setServerName] = useState(props.serverName);
    const [serverState, setServerState] = useState(props.serverState);
    const [serverID, setServerID] = useState(props.serverID);

    return (
        <div className="servertab">
            <div className='servertab-id'>{serverID}</div>
            <div className='servertab-verticalline'>|</div>
            <div className='servertab-image'><img src={serverImage} /></div>
            <div className='servertab-verticalline'>|</div>
            <div className='servertab-ip'>{serverName}</div>
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