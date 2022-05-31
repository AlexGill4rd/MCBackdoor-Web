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

function PlayerControllerPage(){
    const { serverid } = useParams();
    const [loadedPanel, setLoadedPanel] = useState<any>();

    const [server, setServer] = useState<any>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

    useEffect(function loadServer(){
        socket.emit("client:mcserver-get", serverid)
    }, []);
    useEffect(function updateServer(){
        socket.on(`server:mcserver-get`, data => {
            setServer(JSON.parse(data.JsonData))
        })
    }, []);
    useEffect(function checkServerStatus(){
        socket.on(`server:disable-server`, data => {
            if (data.Address === server.Address){
                if (data.State == false)setServer(null);
            }
        })
    }, [server]);
    function handleFeatureClick(panelName: any) {
        if (selectedPlayer !== null)
            setLoadedPanel(panelName);
    }
    function handlePlayerClick(player: any){
        setSelectedPlayer(player);
    }
    if(server === null){
        return <Navigate to='/controller/servers' />
    } else {
        return (
            <div className="controller-container">
                <div className="controller-players">
                    <div className="controller-players-header">
                        <div className='controller-players-header-icon'><FaUsers /></div>
                        <div className='controller-players-header-playercount'>{server.MaxPlayers !== undefined ? server.OnlinePlayers + " / " + server.MaxPlayers : "- / 0"}</div>
                        <Link className='controller-players-header-back' to={'/controller/servers/' + serverid}>
                            Ga terug
                        </Link>
                    </div>
                    <div className="controller-players-list">
                        <PlayerList 
                            serverid={serverid} 
                            onPlayerClick={handlePlayerClick} 
                            selectedPlayer={selectedPlayer} /> 
                    </div>
                </div>
                <div className="controller-features">
                    <FeatureButton title='Operator' description="Instellingen voor het beheren van de operator status van de speler" onClick={() => handleFeatureClick(<OperatorPanel player={selectedPlayer} />)} />
                    <FeatureButton title='Gamemode' description="Pas de gamemode aan van de speler" onClick={() => handleFeatureClick(<GamemodePanel player={selectedPlayer} />)} />
                    <FeatureButton title='Crash' description="Laat de speler zijn client crashen" onClick={() => handleFeatureClick(<CrashPanel player={selectedPlayer} />)} />
                    <FeatureButton title='Kick' description="Kick de speler van de server" onClick={() => handleFeatureClick(<KickPanel player={selectedPlayer} />)} />
                    <FeatureButton title='Teleport' description="Teleporteer de speler naar een bepaalde locatie" onClick={() => handleFeatureClick(<TeleportPanel player={selectedPlayer} Address={server.Address} />)} />
                    <FeatureButton title='Whitelist' description="Pas de whitelist status van de speler aan" onClick={() => handleFeatureClick(<WhitelistPanel player={selectedPlayer} />)} />
                    <FeatureButton title='Kill' description="Vermoord de speler" onClick={() => handleFeatureClick(<KillPanel player={selectedPlayer} />)} />
                    <FeatureButton title='Ban' description="Verban de speler van de server" onClick={() => handleFeatureClick(<BanPanel player={selectedPlayer} />)} />
                    <FeatureButton title='Private Message Spam' description="Spam de speler vol met verschillende willekeurige berichten" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Leaken' description="Leak de gegevens van de speler zijn account" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Irriteren' description="Irriteer de speler met wat toys" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Speler Data' description="Bekijk al de informatie over de speler" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Inventory' description="Bekijk en pas de inventarissen van de speler aan" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Money' description="Pas het saldo van de speler aan" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Experience' description="Geef de speler experience of verwijder ze" onClick={() => handleFeatureClick(OperatorPanel)} />
                    <FeatureButton title='Auto Kicker' description="Zorgt ervoor dat de speler niet meer in staat is de server te joinen. Hij zal telkens gekicked worden." onClick={() => handleFeatureClick(OperatorPanel)} />
                </div>
                <div className="controller-panel">
                    {
                        loadedPanel != null && selectedPlayer != null ?
                        loadedPanel : //Laadt panel in
                        <>Selecteer een speler</> //Laad panel niet in, maar geef instructie
                    }
                </div>
            </div>
        );
    }
}
export default PlayerControllerPage;