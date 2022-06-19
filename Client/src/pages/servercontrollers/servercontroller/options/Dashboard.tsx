import './DashboardStyle.scss';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import EditIcon from '@mui/icons-material/Edit';

import { Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { socket } from '../../../../socket/socket';
import VersionModal from './dashboard/VersionModal';
import IpAddress from '../../../../IpAddress';
import Chat from './dashboard/Chat';

var SocketIOFileUpload = require('socketio-file-upload');

function Dashboard(props: {Server: any}) {
    const [players, setPlayers] = useState<any>([]);
    const [server, setServer] = useState<any>(props.Server);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    useEffect(function loadPlayers(){
        socket.emit("client:server-player-list", server.Servername);
    }, []);
    useEffect(function updatePlayers(){
        socket.on(`server:mcserver-player-list-${server.Servername}`, data => {
            setPlayers(data.Players);
        })
    }, []);
    useEffect(function updateServerData(){
        socket.on("server:update-server", data => {
            setServer(data);
        });
    }, []);
    function handleVersionEdit(){
        setModalIsOpen(true);
    }
    function handleVersionEditCancel(){
        setModalIsOpen(false);
    }
    function handleVersionConfirm(url: any){
        setModalIsOpen(false);
        var data = {
            Server: server,
            URL: url
        }
        socket.emit("client:version-update", data)
    }
    
    return (
        <div className='dashboard'>
            <div className='dashboard-data'>
                <div className='dashboard-data-info'>
                    <div className='dashboard-data-info-left'>
                        <div className='dashboard-data-info-state'>
                            <Tooltip title="Doe de server uit" disableInteractive placement='top'>
                                <PowerSettingsNewIcon className='dashboard-data-info-state-off' sx={server.State ? {backgroundColor: "lime",padding:"4px", borderRadius:"50%", fontSize: "1.9em"} : {backgroundColor: "red",padding:"4px", borderRadius:"50%", fontSize: "1.9em"}} />
                            </Tooltip>                     
                        </div>
                        <div className='dashboard-data-info-address'>
                            <label>Servername:</label>
                            <input readOnly type='text' value={server.Servername} />
                        </div>
                        <div className='dashboard-data-info-motd'>
                            <label>Server MOTD:</label>
                            <input readOnly type='text' value={server.MOTD} />
                        </div>
                        <div className='dashboard-data-info-version'>
                            <div className='dashboard-data-info-version-icon'>
                                <img src='https://static.spigotmc.org/img/spigot-og.png' />
                            </div>
                            <div className='dashboard-data-info-version-info'>
                                <label>{server.Version}</label>
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
                        <div className='dashboard-data-info-playercount'>{server.OnlinePlayers + " / " + server.MaxPlayers}</div>
                        <div className='dashboard-data-info-memory'>{server.MemoryUsage + " MB / " + server.MaxMemory + " MB"}</div>    
                    </div>
                </div>
                <div className='dashboard-data-chat'>
                    <Chat Server={server} />
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
            {modalIsOpen && <VersionModal onAccept={handleVersionConfirm} onCancel={handleVersionEditCancel} />}
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