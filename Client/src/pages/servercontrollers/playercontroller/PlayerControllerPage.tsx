import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PlayerList from './components/PlayerList';
import FeatureButton from './features/FeatureButton';
import OperatorPanel from './features/panels/OperatorPanel';
import './PlayerControllerPageStyling.scss';

import { FaUsers } from 'react-icons/fa';
import IpAddress from '../../../IpAddress';

import socketIOClient from "socket.io-client";
var ip = new IpAddress();
let socket = socketIOClient(`http://${ip.getIP()}:3001`)

function PlayerControllerPage(){
    const { serverid } = useParams();
    const [loadedPanel, setLoadedPanel] = useState(null);
    const [activePlayer, setActivePlayer] = useState(null);

    const [server, setServer] = useState<any>(null);
    const [players, setPlayers] = useState<any>([]);

    useEffect(function loadPlayers(){
        socket.emit("client:server-player-list", serverid)
    }, []);
    useEffect(function updatePlayers(){
        socket.on(`minecraft:server-player-list`, data => {
            console.log(data)
            setPlayers(data);
        })
    }, []);

    useEffect(() => {
        socket.emit("client:active-players", server.Name)
        socket.on(`server:active-players`, players => {
            setPlayers(players);
        })
    }, []);
    useEffect(() => {
        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/server/get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: "6969", serverid: serverid})
        }).then(res => res.json())
        .then(json => setServer(json));
    }, []);

    function handleClick(panelName: any) {
        setLoadedPanel(panelName);
    }
    function handlePlayerClick (player: any) {
        setActivePlayer(player);
    }
    return (
        <div className="controller-container">
            <div className="controller-players">
                <div className="controller-players-header">
                    <div className='controller-players-header-icon'><FaUsers /></div>
                    <div className='controller-players-header-playercount'>{players !== null && server !== null && server.MaxPlayers !== undefined ? players.length + " / " + server.MaxPlayers : 0 + " / 0"}</div>
                    <Link className='controller-players-header-back' to={'/controller/servers/' + serverid}>
                        Ga terug
                    </Link>
                </div>
                <div className="controller-players-list">
                    <PlayerList server={server} activePlayer={activePlayer} onPlayerClick={() => handlePlayerClick} /> 
                </div>
            </div>
            <div className="controller-features">
                <FeatureButton title='Operator' description="Instellingen voor het beheren van de operator status van de speler" onClick={() => handleClick(<OperatorPanel player={activePlayer} />)} />
                <FeatureButton title='Gamemode' description="Pas de gamemode aan van de speler" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Crash' description="Laat de speler zijn client crashen" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Kick' description="Kick de speler van de server" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Teleport' description="Teleporteer de speler naar een bepaalde locatie" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Whitelist' description="Pas de whitelist status van de speler aan" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Clear Inventory' description="Verwijder al de items in de speler zijn inventaris" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Kill' description="Vermoord de speler" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Ban' description="Verban de speler van de server" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Private Message Spam' description="Spam de speler vol met verschillende willekeurige berichten" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Leaken' description="Leak de gegevens van de speler zijn account" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Irriteren' description="Irriteer de speler met wat toys" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Speler Data' description="Bekijk al de informatie over de speler" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Inventory' description="Bekijk en pas de inventarissen van de speler aan" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Money' description="Pas het saldo van de speler aan" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Experience' description="Geef de speler experience of verwijder ze" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Auto Kicker' description="Zorgt ervoor dat de speler niet meer in staat is de server te joinen. Hij zal telkens gekicked worden." onClick={() => handleClick(OperatorPanel)} />
            </div>
            <div className="controller-panel">
                {loadedPanel != null && activePlayer != null ?
                loadedPanel :
                <>Selecteer een speler</>    
            }
            </div>
        </div>
    );
}
export default PlayerControllerPage;