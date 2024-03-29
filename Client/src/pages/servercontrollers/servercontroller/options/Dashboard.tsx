import './DashboardStyle.scss';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';

import { Button, Select, Tooltip, SelectChangeEvent, MenuItem, Checkbox, ListItemText } from '@mui/material';

import { useEffect, useState } from 'react';
import { socket } from '../../../../socket/socket';
import VersionModal from './dashboard/VersionModal';
import Chat from './dashboard/Chat';
import IconModal from './dashboard/IconModal';
import { FaCopy } from 'react-icons/fa';

function Dashboard(props: {Server: any}) {
    const [players, setPlayers] = useState<any>([]);
    const [server, setServer] = useState<any>(props.Server);

    const [messages, setMessages] = useState<any[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    useEffect(() => {
        function loadPlayers(){
            socket.emit("feature:server", socket.id, server.Servername, "playerlist", {});
        }
        function updatePlayers(){
            socket.on(`server:get-playerlist`, data => {
                setPlayers(data);
            })
        }
        function updateServerData(){
            socket.on(`server:updated-server-${props.Server.id}`, data => {
                setServer(data);
                socket.emit("feature:server", socket.id, props.Server.Servername, "chat-listener", {})
            });
        }
        function serverDisconnects(){
            socket.on(`server:disable-server-${props.Server.id}`, data => {
                setServer(data)
            })
        }
        function serverEnabled(){
            socket.on(`server:enabled-${props.Server.Servername}`, data => {
                setServer(data)
            })
        }
        function handleChat(){
            socket.emit("feature:server", socket.id, props.Server.Servername, "chat-listener", {})
            return () => {
                socket.emit("feature:server", socket.id, props.Server.Servername, "chat-stoplistening", {})
            }
        }
        function listenMessages() {
            socket.on(`server:get-chat-${props.Server.Servername}`, (player, message) => {
                var data = {
                    Player: player,
                    Message: message,
                    Date: new Date().toLocaleTimeString()
                }
                setMessages((messages: any) => [...messages, data])
            });
        }
        loadPlayers();
        updatePlayers();
        updateServerData();
        serverDisconnects();
        serverEnabled();
        handleChat();
        listenMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            URL: url
        }
        socket.emit("feature:server", socket.id, props.Server.Servername, "version-update", data)
    }
    const [messageFind, setMessageFind] = useState<string>("")
    const [messagesFound, setMessagesFound] = useState<string[]>([])
    //EVENT WHEN SEARCH IS EDITED
    function handleMessageSearch(e:any){
        setMessageFind(e.target.value)
    }
    const [filters, setFilters] = useState<string[]>(["ALLES"]);
    useEffect(function updateMessagesFound(){

        var found:string[] = []
        messages.forEach((data:any) => {
            if (data.Message.toString().toLowerCase().startsWith(messageFind.toLowerCase()) || messageFind === ""){
                if (filters.includes(data.Player.Displayname) || filters.includes("ALLES"))
                found.push(data);
            }
        })
        setMessagesFound(found)
        
    }, [messages, messageFind, filters])
    //COMBO BOX HANDLERS
    const [playernames, setPlayernames] = useState<string[]>([])

    useEffect(function loadPlayernames() {
        setPlayernames([]);
        setPlayernames((playernames: any) => [...playernames, "ALLES"]);
        players.forEach((player:any) => {
            setPlayernames((playernames: any) => [...playernames, player.Displayname]);
        });
    }, [players]);

    const handleFilterChange = (event: SelectChangeEvent<typeof filters>) => {
        const {target: { value },} = event;
        setFilters(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    //SERVER ICON CHANGE
    const [icoonModalIsOpen, setIcoonModalIsOpen] = useState<boolean>(false);
    function openIcoonModal(){
        if (server.State)
            setIcoonModalIsOpen(true)
        else
            socket.emit("feature:server-log", socket.id, "Je kan geen icoon aanpassen wanneer de server uit staat!", "error", "Server disabled");   
    }
    function sluitIcoonModal(){
        setIcoonModalIsOpen(false)
    }
    function handleIcoonChange(image: any){
        sluitIcoonModal();
        if (server.State){
            var data = {
                Image: image
            }
            socket.emit("feature:server", socket.id, props.Server.Servername, "icon-update", data)
        } else
            socket.emit("feature:server-log", socket.id, "Je kan geen icoon aanpassen wanneer de server uit staat!", "error", "Server disabled");   
        
    }
    //SERVER FUNCTIONS
    function handleServerOff() {
        if (server.State)
            socket.emit("feature:server", socket.id, props.Server.Servername, "disable", {})
        else
            socket.emit("feature:server-log", socket.id, "De server staat niet aan!", "error", "Server disabled");
    }
    function handleServerReload() {
        if (server.State)
            socket.emit("feature:server", socket.id, props.Server.Servername, "reload", {})
        else
            socket.emit("feature:server-log", socket.id, "De server staat niet aan!", "error", "Server disabled");
    }
    //Broadcasting
    const [bc, setBC] = useState<string>("");
    function handlebroadcast(e: any){
        e.preventDefault();
        if (server.State){
            var data = {
                Message: bc
            }
            socket.emit("feature:server", socket.id, props.Server.Servername, "broadcast", data)
            setBC("");
        } else
            socket.emit("feature:server-log", socket.id, "Je kan geen broadcast doen wanneer de server uit staat!", "error", "Server disabled");   
    }
    function handleBCChange(e: any){
        setBC(e.target.value);
    }
    function copyToClipboard(){
        setTimeout(async()=>await window.navigator.clipboard.writeText(props.Server.Servername), 10)
        socket.emit("feature:server-log", socket.id, "Ip address gekopieerd!", "success");
    }
    return (
        <div className='dashboard'> 
            <div className='dashboard-data'>
                <div className='dashboard-data-info'>
                    <div className='dashboard-data-info-left'>
                        <div className='dashboard-data-info-address'>
                            <label>Servername:</label>
                            <div className='dashboard-data-info-address-container'>
                                <input readOnly type='text' value={server.Servername} />
                                <Button 
                                    onClick={copyToClipboard} 
                                    variant="contained" 
                                    startIcon={<FaCopy />}
                                    sx={{
                                        height: 30,
                                        width: "20%"
                                    }}
                                >
                                    Copy
                                </Button> 
                            </div>
                        </div>
                        <div className='dashboard-data-info-motd'>
                            <label>Server MOTD:</label>
                            <input readOnly type='text' value={server.MOTD} />
                        </div>
                        <div className='dashboard-data-info-broadcast'>
                            <label>Broadcast naar de server:</label>
                            <form onSubmit={handlebroadcast}>
                                <input onChange={handleBCChange} type='text' value={bc} placeholder="Geef een bericht..." />
                            </form>
                        </div>
                        <div className='dashboard-data-info-version'>
                            <div className='dashboard-data-info-version-icon'>
                                <img src='https://static.spigotmc.org/img/spigot-og.png' alt="version icon" />
                            </div>
                            <div className='dashboard-data-info-version-info'>
                                <label>{server.Version}</label>
                            </div>
                            {server.State && 
                            <Button 
                                onClick={handleVersionEdit} 
                                variant="contained" 
                                startIcon={<EditIcon />}
                            >
                                Aanpassen
                            </Button> 
                        }
                        </div>
                        <div className='dashboard-data-info-state'>
                            <Tooltip title="Doe de server uit" disableInteractive placement='top'>
                                <div onClick={handleServerOff} className='dashboard-data-info-state-off' style={server.State ? {} : {backgroundColor: "red"}}>
                                    <PowerSettingsNewIcon />
                                </div>
                            </Tooltip>        
                            <Tooltip title="Reload de server" disableInteractive placement='top'>
                                <div onClick={handleServerReload} className='dashboard-data-info-state-reload' style={server.State ? {} : {backgroundColor: "red"}}>
                                    <ReplayIcon />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='dashboard-data-info-right'>
                        <div className='dashboard-data-info-icon' onClick={openIcoonModal}>
                            <img src={props.Server.Image} alt="server icon" />
                        </div>
                        <div className='dashboard-data-info-container'>
                            <div className='dashboard-data-info-playercount'>{server.OnlinePlayers + " / " + server.MaxPlayers}</div>
                            <div className='dashboard-data-info-memory'>{server.MemoryUsage + " MB / " + server.MaxMemory + " MB"}</div>    
                            <div className='dashboard-data-info-memory'>{"TPS: " + server.TPS + " / 20"}</div>    
                            <div className='dashboard-data-info-memory'>{"Host Environement: " + server.HostEnvironement}</div>    
                            <div className='dashboard-data-info-memory'>{"Cores: " + server.CoreCount}</div>    
                            <div className='dashboard-data-info-memory'>{"BukkitVersion: " + server.BukkitVersion}</div>    
                            <div className='dashboard-data-info-memory'>{"BukkitName: " + server.BukkitName}</div>    
                            <div className='dashboard-data-info-memory'>{"JavaVersion: " + server.JavaVersion}</div>    
                            <div className='dashboard-data-info-memory'>{"OsName: " + server.OsName}</div>    
                            <div className='dashboard-data-info-memory'>{"OsArch: " + server.OsArch}</div>    
                            <div className='dashboard-data-info-memory'>{"OsVersion: " + server.OsVersion}</div>    
                        </div>
                    </div>
                </div>
                <div className='dashboard-data-chat'>
                    <div className='dashboard-data-chat-sort'>
                        <input autoComplete="off" type="text" onChange={handleMessageSearch} value={messageFind} id="message" name="message" placeholder="Zoek een bericht..." />
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={filters}
                            onChange={handleFilterChange}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{
                                width: "200px",
                                height: 35,
                                marginLeft: "10px",
                            }}
                            >
                            {playernames.map((name) => {
                                return (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={filters.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </div>
                    <Chat Server={server} Messages={messagesFound}/>
                </div>
            </div>
            <div className='dashboard-players'>
                {players.map((player: any) => {
                    return (
                        <div key={player.UUID} className='dashboard-players-player'>
                            <div className='dashboard-players-player-front'>
                                <img src={player.Icon} alt="player icon" />
                                <div className='dashboard-players-player-displayname'>{player.Displayname}</div>
                            </div>
                            <div className='dashboard-players-player-world'>World: {player.World}</div>
                        </div>
                    );
                })}
            </div>
            {modalIsOpen && <VersionModal onAccept={handleVersionConfirm} onCancel={handleVersionEditCancel} />}
            {icoonModalIsOpen && <IconModal onAccept={handleIcoonChange} onCancel={sluitIcoonModal} />}
        </div>
    );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: "auto",
      },
    },
};
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