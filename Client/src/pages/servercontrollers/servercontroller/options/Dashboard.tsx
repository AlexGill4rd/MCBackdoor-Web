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

function Dashboard(props: {Server: any}) {
    const [players, setPlayers] = useState<any>([]);
    const [server, setServer] = useState<any>(props.Server);

    const [messages, setMessages] = useState<any[]>([]);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    

    useEffect(function loadPlayers(){
        socket.emit("client:server-player-list", server.Servername);
    }, []);
    useEffect(function updatePlayers(){
        socket.on(`server:mcserver-player-list-${server.Servername}`, data => {
            setPlayers(data);
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
    //ADD NEW MESSAGES
    useEffect(function listenMessages() {
        socket.on(`server:server-chat-${props.Server.Servername}`, data => {
            setMessages((messages: any) => [...messages, data])
        });
    }, []);
    const [messageFind, setMessageFind] = useState<string>("")
    const [messagesFound, setMessagesFound] = useState<string[]>([])
    //EVENT WHEN SEARCH IS EDITED
    function handleMessageSearch(e:any){
        setMessageFind(e.target.value)
    }
    const [filters, setFilters] = useState<string[]>(["ALLES"]);
    useEffect(function updateMessagesFound(){

        var found:string[] = []
        messages.map((data:any) => {
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
        players.map((player:any) => {
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
        setIcoonModalIsOpen(true)
    }
    function sluitIcoonModal(){
        setIcoonModalIsOpen(false)
    }
    function handleIcoonChange(url: string){
        sluitIcoonModal();
        var data = {
            Server: server,
            URL: url
        }
        socket.emit("client:icoon-update", data)
    }
    //SERVER FUNCTIONS
    function handleServerOff() {
        var data = {
            Servername: server.Servername,
            Feature: "disable"
        }
        socket.emit("client:server-features", data)
    }
    function handleServerReload() {
        var data = {
            Servername: server.Servername,
            Feature: "reload"
        }
        socket.emit("client:server-features", data)
    }
    return (
        <div className='dashboard'> 
            <div className='dashboard-data'>
                <div className='dashboard-data-info'>
                    <div className='dashboard-data-info-left'>
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
                            <img src={props.Server.Image} />
                        </div>
                        <div className='dashboard-data-info-playercount'>{server.OnlinePlayers + " / " + server.MaxPlayers}</div>
                        <div className='dashboard-data-info-memory'>{server.MemoryUsage + " MB / " + server.MaxMemory + " MB"}</div>    
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
                            {playernames.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={filters.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
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
                                <img src={player.Icon} />
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