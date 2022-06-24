import { Button, Tooltip } from '@mui/material';

import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

import './ServerTab.scss';

function ServerTab(props: {server: any;}){

    return (
        <div className="servertab">
            <Tooltip title={props.server.id} disableInteractive placement='top'>
                <div className='servertab-id'>Hover voor ID</div>
            </Tooltip>
            <div className='servertab-verticalline'>|</div>
            <Tooltip title={props.server.Version} disableInteractive placement='top'>
                <div className='servertab-image'><img src={props.server.Image} alt="Server logo" /></div>
            </Tooltip>
            <div className='servertab-verticalline'>|</div>
            <Tooltip title={props.server.MOTD} disableInteractive placement='top'>
                <div className='servertab-ip'>{props.server.Servername}</div>
            </Tooltip>
            <div className='servertab-verticalline'>|</div>
            <div className='servertab-players'>{props.server.OnlinePlayers === undefined ? "- / " + props.server.MaxPlayers : props.server.OnlinePlayers + " / " + props.server.MaxPlayers}</div>
            
            {props.server.State ?
                <>
                    <div className='servertab-verticalline'>|</div>
                    <Link to={'/controller/servers/' + props.server.id}>
                        <Button className='servertab-beheren' variant="contained" >
                            Beheren
                        </Button>
                    </Link>
                </> : 
                <></>
            }
            <div className='servertab-verticalline'>|</div>
            {props.server.State === true ?
                <Tooltip title="Server ON"><div className='servertab-state' style={{color: 'lime'}}><FaCheckCircle /></div></Tooltip> :
                <Tooltip title="Server OFF"><div className='servertab-state' style={{color: 'red'}}><FaMinusCircle /></div></Tooltip>
            }
        </div>
    );

}
export default ServerTab;