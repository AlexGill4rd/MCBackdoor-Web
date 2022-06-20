import { useEffect, useState } from 'react';

import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
import IpAddress from '../../../../IpAddress';
import { socket } from '../../../../socket/socket';
import './WhitelistStyle.scss';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

function Whitelist(props: {Server: any}) {
    const [players, setPlayers] = useState<string[]>([]);
    const [whitelistedPlayers, setWhitelistedPlayers] = useState<any[]>([]);

    useEffect(function updateWhitelistedPlayers(){
        socket.on(`server:server-whitelisted-${props.Server.Servername}`, data => {
            setWhitelistedPlayers(data);
        });
    }, []);
    //LOAD PLAYER DATA & WHITELISTED PLAYERS
    useEffect(function loadPlayerList(){
        var data = {
            Servername: props.Server.Servername,
            Feature: "whitelisted"
        }
        socket.emit("client:server-features", data);

        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/players/get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: "6969"})
        }).then(res => res.json())
        .then(json => {
            setPlayers(json)
        });
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
                if (player.Displayname.toLowerCase().startsWith(whitelistSearch.toLowerCase()) || whitelistSearch === "")
                    shownList.push(player); 
            }
        })
        setShownWhitelistedPlayers(shownList);
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
        setShownPlayers(shownList);
    }, [whitelistedPlayers, players, playerSearch]);
    function whitelistContainsPlayer(player: any){
        var contained: boolean = false;
        whitelistedPlayers.map((whitelistedPlayer: any) => {
            if (player.UUID == whitelistedPlayer.UUID){
                contained = true;
            }
        }) 
        return contained;
    }
    //MENU HANDLERS
    function handleWhitelistAdd(player: any){
        var data = {
            Servername: props.Server.Servername,
            Player: player.UUID,
            Feature: "whitelist-add"
        }
        socket.emit("client:server-features", data);
    }
    function handleWhitelistRemove(player: any){
        var data = {
            Servername: props.Server.Servername,
            Player: player.UUID,
            Feature: "whitelist-remove"
        }
        socket.emit("client:server-features", data);
    }
    return (
        <div className='whitelist'>
            <div className='whitelist-sorting'>
                <input autoComplete="off" type="text" onChange={handleWhitelistSearchChange} value={whitelistSearch} id="whitelistspeler" name="whitelistspeler" placeholder="Zoek een speler..." />
            </div>
            <div className='whitelist-divider'>Whitelisted spelers</div>
            <div className='whitelist-whitelisted'>
                <div className='whitelist-whitelisted-list'>
                    {shownWhitelistedPlayers.map((player: any) => {
                        return (
                            <Menu className='item-contextmenu' menuButton={
                                <div key={player.UUID} className="whitelist-player">
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
                    })}
                </div>
            </div>
            <div className='whitelist-sorting'>
                <input autoComplete="off" type="text" onChange={handleSearchChange} value={playerSearch} id="speler" name="speler" placeholder="Zoek een speler..." />
            </div>
            <div className='whitelist-divider'>Speler lijst</div>
            <div className='whitelist-players'>
                <div className='whitelist-players-list'>
                    {shownPlayers.map((player: any) => {
                        return (
                            <Menu className='item-contextmenu' menuButton={
                                <div key={player.UUID} className="whitelist-player">
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
                    })}
                </div>
            </div>
        </div>
    );
}
export default Whitelist;