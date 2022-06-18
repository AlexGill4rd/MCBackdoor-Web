import './DashboardStyle.scss';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import EditIcon from '@mui/icons-material/Edit';

import { Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { socket } from '../../../../socket/socket';

function Dashboard(props: {Server: any}) {
    const [players, setPlayers] = useState<any>([]);
    const [server, setServer] = useState<any>(props.Server);

    useEffect(function loadPlayers(){
        socket.emit("client:server-player-list", props.Server.Servername);
    }, []);
    useEffect(function updatePlayers(){
        socket.on(`server:mcserver-player-list-${props.Server.Servername}`, data => {
            setPlayers(data.Players);
        })
    }, []);
    useEffect(function updateServer(){
        setServer(props.Server)
    }, [props.Server]);
    console.log(server)
    function handleVersionEdit(){

    }
    return (
        <div className='dashboard'>
            <div className='dashboard-data'>
                <div className='dashboard-data-info'>
                    <div className='dashboard-data-info-left'>
                        <div className='dashboard-data-info-state'>
                            <Tooltip title="Doe de server uit" disableInteractive placement='top'>
                                <PowerSettingsNewIcon className='dashboard-data-info-state-off' sx={props.Server.State ? {backgroundColor: "lime",padding:"4px", borderRadius:"50%", fontSize: "1.9em"} : {backgroundColor: "red",padding:"4px", borderRadius:"50%", fontSize: "1.9em"}} />
                            </Tooltip>                     
                        </div>
                        <div className='dashboard-data-info-address'>
                            <label>Servername:</label>
                            <input readOnly type='text' value={props.Server.Servername} />
                        </div>
                        <div className='dashboard-data-info-motd'>
                            <label>Server MOTD:</label>
                            <input readOnly type='text' value={props.Server.MOTD} />
                        </div>
                        <div className='dashboard-data-info-version'>
                            <div className='dashboard-data-info-version-icon'>
                                <img src='https://static.spigotmc.org/img/spigot-og.png' />
                            </div>
                            <div className='dashboard-data-info-version-info'>
                                <label>{props.Server.Version}</label>
                            </div>
                            <Button 
                                onClick={handleVersionEdit} 
                                variant="contained" 
                                startIcon={<EditIcon />}
                            >
                                    Aanpassen
                            </Button> 
                        </div> 
                    </div>
                    <div className='dashboard-data-info-right'>
                        <div className='dashboard-data-info-icon'>
                            <img src={props.Server.Image} />
                        </div>
                        <div className='dashboard-data-info-playercount'>{props.Server.OnlinePlayers + " / " + props.Server.MaxPlayers}</div>
                        <div className='dashboard-data-info-memory'>{props.Server.MemoryUsage + " / " + props.Server.MaxMemory}</div>    
                    </div>
                </div>
                <div className='dashboard-data-chat'>

                </div>
            </div>
            <div className='dashboard-players'>
                {players.map((player: any) => {
                    return (
                        <div key={player.UUID} className='dashboard-players-player'>
                            <div className='dashboard-players-player-icon'>{player.Icon}</div>
                            <div className='dashboard-players-player-displayname'>{player.Displayname}</div>
                            <div className='dashboard-players-player-ip'>{player.Ip}</div>
                            <div className='dashboard-players-player-world'>{player.World}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Dashboard;

/*
    On/Off switch
    Ip Address
    Server icon
    Player list
    Server memory usage
    Server Version
    Server MOTD
    Server player amount
    Server chat
    Server 
*/