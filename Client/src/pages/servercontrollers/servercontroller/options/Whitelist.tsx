import { useEffect, useState } from 'react';

import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
import IpAddress from '../../../../IpAddress';
import { socket } from '../../../../socket/socket';
import './WhitelistStyle.scss';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

function Whitelist(props: {Server: any}) {
    const [players, setPlayers] = useState<string[]>([]);
    const [whitelistedPlayers, setWhitelistedPlayers] = useState<any[]>([]);

    useEffect(function updateWhitelistedPlayers(){
        socket.on(`server:get-whitelisted-${props.Server.Servername}`, players => {
            setWhitelistedPlayers(sort_by_key(players, "Displayname"));
        });
    }, []);
    //LOAD PLAYER DATA & WHITELISTED PLAYERS
    useEffect(function loadPlayerList(){
        socket.emit("server:get-players-database", (response: any) => {
            setPlayers(response);
        });
    }, [players, whitelistedPlayers]);
    useEffect(() => {
        socket.emit("feature:server", socket.id, props.Server.Servername, "whitelisted", {})
    }, []);
    const [whitelistSearch, setWhitelistSearch] = useState<string>("");
    const [shownWhitelistedPlayers, setShownWhitelistedPlayers] = useState<any[]>([]);
    //WHITELIST SORTING
    function handleWhitelistSearchChange(e:any){
        setWhitelistSearch(e.target.value)
    }
    useEffect(function updateShownWhitelisted() {
        var shownList:any[] = [];
        players.map((player:any) => {
            if (whitelistContainsPlayer(player)){
                if (player.Displayname.toLowerCase().startsWith(whitelistSearch.toLowerCase()) || whitelistSearch === ""){
                    shownList.push(player); 
                }
            }
        })
        setShownWhitelistedPlayers(sort_by_key(shownList, "Displayname"));
    }, [players, whitelistedPlayers, whitelistSearch]);

    //PLAYER LIST SORTING
    const [playerSearch, setPlayerSearch] = useState<string>("");
    const [shownPlayers, setShownPlayers] = useState<any[]>([]);

    function handleSearchChange(e:any){
        setPlayerSearch(e.target.value)
    }
    useEffect(function updateShownPlayers() {
        setShownPlayers([])
        var shownList:any[] = [];
        players.map((player:any) => {
            if (player.Displayname.toLowerCase().startsWith(playerSearch.toLowerCase()) || playerSearch === ""){
                if (!whitelistContainsPlayer(player)){
                    shownList.push(player); 
                }
            }
        })
        setShownPlayers(sort_by_key(shownList, "Displayname"));
    }, [whitelistedPlayers, players, playerSearch]);
    function whitelistContainsPlayer(player: any){
        var contained: boolean = false;
        whitelistedPlayers.map((whitelistedPlayer: any) => {
            if (player.Displayname === whitelistedPlayer.Displayname){
                contained = true;
            }
        }) 
        return contained;
    }
    //MENU HANDLERS
    function handleWhitelistAdd(player: any){
        socket.emit("feature:server", socket.id, props.Server.Servername, "whitelist-add", {Player: player.Displayname});
    }
    function handleWhitelistRemove(player: any){
        socket.emit("feature:server", socket.id, props.Server.Servername, "whitelist-remove", {Player: player.Displayname});
    }
    //Add new player to whitelist
    const [newPlayerName, setNewPlayerName] = useState<string>("");
    const [newPlayer, setNewPlayer] = useState<any>(null);

    function handleNewPlayerChange(e: any){
        setNewPlayerName(e.target.value)
    }
    function handelPlayerSearch() {
        if (newPlayerName !== ""){
            var ip = new IpAddress();
            fetch(`http://${ip.getIP()}:8080/player/find`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({Displayname: newPlayerName})
            }).then(res => res.json())
            .then(json => {
                if (json.Displayname !== undefined && json.UUID !== undefined){
                    setNewPlayer(json)
                    socket.emit("feature:server-log", socket.id, "De speler is gevonden!", "success");
                }else 
                    socket.emit("feature:server-log", socket.id, "Kan de speler op dit moment niet vinden!", "error");
            });
        }
    }
    function handleAddNewPlayer() {
        newPlayer.Servername = props.Server.Servername;
        socket.emit("player:register", newPlayer)
        handleWhitelistAdd(newPlayer);
        setNewPlayer(null)
        setNewPlayerName("");
    }
    function sort_by_key(array: any, key: any){
        return (array.sort(function(a:any,b:any){
            var x = a[key].toLowerCase() < b[key].toLowerCase()? -1:1; 
            return x; 
        }))
    }
    return (
        <div className='whitelist'>
            <div className='whitelist-addplayer'>
                <img src={newPlayer && newPlayer.Icon} />
                <input autoComplete="off" type="text" onChange={handleNewPlayerChange} value={newPlayerName} id="newplayer" name="newplayer" placeholder="Voeg een nieuwe speler toe.." />
                {!newPlayer &&<Button 
                    onClick={handelPlayerSearch} 
                    variant="contained" 
                    startIcon={<SearchIcon />}
                >
                    Zoek Speler
                </Button>}
                {newPlayer && <Button 
                    onClick={handleAddNewPlayer} 
                    variant="contained" 
                    startIcon={<AddIcon />}
                >
                        Voeg toe
                </Button>}
                
            </div>
            <div className='whitelist-sorting'>
                <input autoComplete="off" type="text" onChange={handleWhitelistSearchChange} value={whitelistSearch} id="whitelistspeler" name="whitelistspeler" placeholder="Zoek een speler..." />
            </div>
            <div className='whitelist-divider'>Whitelisted spelers</div>
            <div className='whitelist-whitelisted'>
                <div className='whitelist-whitelisted-list'>
                    {shownWhitelistedPlayers.length > 0 ? shownWhitelistedPlayers.map((player: any) => {
                        return (
                            <Menu key={player.UUID} className='item-contextmenu' menuButton={
                                <div className="whitelist-player">
                                    <div className="whitelist-player-icon">
                                        <img src={player.Icon} />
                                    </div>
                                    <div className="whitelist-player-displayname">
                                        {player.Displayname}
                                    </div>
                                </div>
                            }>
                                <MenuHeader>Optie's</MenuHeader>
                                <MenuItem className='item-context-button' onClick={() => handleWhitelistRemove(player)}><PlaylistRemoveIcon /><span>Whitelist Remove</span></MenuItem>
                            </Menu>
                        );
                    }) : <div>Geen spelers gevonden!</div>}
                </div>
            </div>
            <div className='whitelist-sorting'>
                <input autoComplete="off" type="text" onChange={handleSearchChange} value={playerSearch} id="speler" name="speler" placeholder="Zoek een speler..." />
            </div>
            <div className='whitelist-divider'>Speler lijst</div>
            <div className='whitelist-players'>
                <div className='whitelist-players-list'>
                    {shownPlayers.length > 0 ? shownPlayers.map((player: any) => {
                        return (
                            <Menu key={player.UUID} className='item-contextmenu' menuButton={
                                <div className="whitelist-player">
                                    <div className="whitelist-player-icon">
                                        <img src={player.Icon} />
                                    </div>
                                    <div className="whitelist-player-displayname">
                                        {player.Displayname}
                                    </div>
                                </div>
                            }>
                                <MenuHeader>Optie's</MenuHeader>
                                <MenuItem className='item-context-button' onClick={() => handleWhitelistAdd(player)}><PlaylistAddIcon /><span>Whitelist Add</span></MenuItem>
                            </Menu>
                        );
                    }) : <div>Geen spelers gevonden!</div>}
                </div>
            </div>
        </div>
    );
}
export default Whitelist;