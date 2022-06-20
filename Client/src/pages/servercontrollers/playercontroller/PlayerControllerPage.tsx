import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import PlayerList from './components/PlayerList';
import FeatureButton from './features/FeatureButton';
import OperatorPanel from './features/panels/OperatorPanel';
import './PlayerControllerPageStyling.scss';

import { FaUsers } from 'react-icons/fa';

import GamemodePanel from './features/panels/GamemodePanel';
import CrashPanel from './features/panels/CrashPanel';
import KickPanel from './features/panels/KickPanel';
import TeleportPanel from './features/panels/TeleportPanel';
import WhitelistPanel from './features/panels/WhitelistPanel';
import { socket } from '../../../socket/socket';
import KillPanel from './features/panels/KillPanel';
import BanPanel from './features/panels/BanPanel';
import PMSpamPanel from './features/panels/PMSpamPanel';
import LeakPanel from './features/panels/LeakPanel';
import SpelerDataPanel from './features/panels/SpelerDataPanel';
import InventoryPanel from './features/panels/InventoryPanel';
import ExperiencePanel from './features/panels/ExperiencePanel';
import IrriterenPanel from './features/panels/IrriterenPanel';
import IpAddress from '../../../IpAddress';
import { CircularProgress } from '@mui/material';

function PlayerControllerPage(){
    const { serverid } = useParams();
    const [loadedPanel, setLoadedPanel] = useState<any>(null);

    const [server, setServer] = useState<any>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

    useEffect(function loadServer(){
        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/server/get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({serverid: serverid, token: "6969"})
        }).then(res => res.json())
        .then(json => {
            setServer(json);
        });
    }, []);
    useEffect(function checkServerStatus(){
        socket.on(`server:disable-server-${serverid}`, data => {
            console.log(data);
            setServer(null);
        })
    }, [server]);
    function handleFeatureClick(panelName: any) {
        if (selectedPlayer !== null)
            setLoadedPanel(panelName);
    }
    function handlePlayerClick(player: any){
        setLoadedPanel(null);
        setSelectedPlayer(player);
        if (player === null){
            setLoadedPanel(null);
        }
    }
    if(server != null){
        if (server.State === false){
            return <Navigate to='/controller/servers' />
        }else {
            return (
                <div className="controller-container">
                    <div className="controller-players">
                        <div className="controller-players-header">
                            <div className='controller-players-header-icon'><FaUsers style={{color: "white"}} /></div>
                            <div className='controller-players-header-playercount'>{server.MaxPlayers !== undefined ? server.OnlinePlayers + " / " + server.MaxPlayers : "- / 0"}</div>
                            <Link className='controller-players-header-back' to={'/controller/servers/' + serverid}>
                                Ga terug
                            </Link>
                        </div>
                        <div className="controller-players-list">
                            {server !== null ?
                                <PlayerList 
                                server={server} 
                                onPlayerClick={handlePlayerClick} 
                                selectedPlayer={selectedPlayer} /> :
                                <CircularProgress />    
                            }
                        </div>
                    </div>
                    <div className="controller-features">
                        <FeatureButton title='Operator' description="Instellingen voor het beheren van de operator status van de speler" onClick={() => handleFeatureClick(<OperatorPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Gamemode' description="Pas de gamemode aan van de speler" onClick={() => handleFeatureClick(<GamemodePanel player={selectedPlayer} />)} />
                        <FeatureButton title='Crash' description="Laat de speler zijn client crashen" onClick={() => handleFeatureClick(<CrashPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Kick' description="Kick de speler van de server" onClick={() => handleFeatureClick(<KickPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Teleport' description="Teleporteer de speler naar een bepaalde locatie" onClick={() => handleFeatureClick(<TeleportPanel player={selectedPlayer} Servername={server.Servername} />)} />
                        <FeatureButton title='Whitelist' description="Pas de whitelist status van de speler aan" onClick={() => handleFeatureClick(<WhitelistPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Kill' description="Vermoord de speler" onClick={() => handleFeatureClick(<KillPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Ban' description="Verban de speler van de server" onClick={() => handleFeatureClick(<BanPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Private Message Spam' description="Spam de speler vol met verschillende willekeurige berichten" onClick={() => handleFeatureClick(<PMSpamPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Leaken' description="Leak de gegevens van de speler zijn account" onClick={() => handleFeatureClick(<LeakPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Irriteren' description="Irriteer de speler met wat toys" onClick={() => handleFeatureClick(<IrriterenPanel player={selectedPlayer} />)} />
                        <FeatureButton title='Speler Data' description="Bekijk al de informatie over de speler" onClick={() => handleFeatureClick(<SpelerDataPanel player={selectedPlayer} server={server} />)} />
                        <FeatureButton title='Inventory' description="Bekijk en pas de inventarissen van de speler aan" onClick={() => handleFeatureClick(<InventoryPanel player={selectedPlayer} server={server} />)} />
                        <FeatureButton title='Experience' description="Geef de speler experience of verwijder ze" onClick={() => handleFeatureClick(<ExperiencePanel player={selectedPlayer} />)} />
                    </div>
                    <div className="controller-panel">
                        {
                            loadedPanel !== null && selectedPlayer !== null ?
                            loadedPanel : //Laadt panel in
                            <>Selecteer een speler</> //Laad panel niet in, maar geef instructie
                        }
                    </div>
                </div>
            );
        } 
    }else {
        return <div><CircularProgress /></div>
    }
}
export default PlayerControllerPage;