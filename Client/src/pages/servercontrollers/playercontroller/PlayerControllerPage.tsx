import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PlayerList from './components/PlayerList';
import FeatureButton from './features/FeatureButton';
import GamemodePanel from './features/panels/GamemodePanel';
import OperatorPanel from './features/panels/OperatorPanel';
import './PlayerControllerPageStyling.scss';

import { FaUsers } from 'react-icons/fa';
import IpAddress from '../../../IpAddress';

function PlayerControllerPage(){
    const { serverid } = useParams();
    const [loadedPanel, setLoadedPanel] = useState(null);
    const [activePlayer, setActivePlayer] = useState(null);
    const [server, setServer] = useState<any>(null);
    const [players, setPlayers] = useState<any>(null);

    useEffect(() => {
        var ip = new IpAddress();
        fetch(`http://${ip.getIP()}:8080/servers/${serverid}/players`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({serverID: serverid})
        }).then(res => res.json())
        .then(json => {
            setPlayers(json)
        });
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
                    <div className='controller-players-header-playercount'>{players != null && server != null && server.MaxPlayers != undefined ? players.length + " / " + server.MaxPlayers : 0 + " / 0"}</div>
                    <Link className='controller-players-header-back' to={'/controller/servers/' + serverid}>
                        Ga terug
                    </Link>
                </div>
                <div className="controller-players-list">
                    <PlayerList server={server} activePlayer={activePlayer} onPlayerClick={() => handlePlayerClick} /> 
                </div>
            </div>
            <div className="controller-features">
                <FeatureButton title='Operator' description="Instellingen voor het beheren van de operator status van de speler" onClick={() => handleClick(OperatorPanel)} />
                <FeatureButton title='Gamemode' description="Pas de gamemode aan van de speler" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Crash' description="Laat de speler zijn client crashen" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Kick' description="Kick de speler van de server" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Teleport' description="Teleporteer de speler naar een bepaalde locatie" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Whitelist' description="Pas de whitelist status van de speler aan" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Clear Inventory' description="Verwijder al de items in de speler zijn inventaris" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Kill' description="Vermoord de speler" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Ban' description="Verban de speler van de server" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Private Message Spam' description="Spam de speler vol met verschillende willekeurige berichten" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Leaken' description="Leak de gegevens van de speler zijn account" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Irriteren' description="Irriteer de speler met wat toys" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Speler Data' description="Bekijk al de informatie over de speler" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Inventory' description="Bekijk en pas de inventarissen van de speler aan" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Money' description="Pas het saldo van de speler aan" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Experience' description="Geef de speler experience of verwijder ze" onClick={() => handleClick(GamemodePanel)} />
                <FeatureButton title='Auto Kicker' description="Zorgt ervoor dat de speler niet meer in staat is de server te joinen. Hij zal telkens gekicked worden." onClick={() => handleClick(GamemodePanel)} />
            </div>
            <div className="controller-panel">
                {loadedPanel != null && activePlayer != null ?
                loadedPanel :
                <></>    
            }
            </div>
        </div>
    );
}
export default PlayerControllerPage;