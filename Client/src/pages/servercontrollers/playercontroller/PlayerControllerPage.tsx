import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
import { CircularProgress } from '@mui/material';

import Loading from '../Loading';
import SimplePopup from '../../../globaltsx/SimplePopup';
import ArmorPanel from './features/panels/ArmorPanel';

function PlayerControllerPage(){
    const { serverid } = useParams();
    const [loadedPanel, setLoadedPanel] = useState<any>(null);

    const [server, setServer] = useState<any>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

    useEffect(() => {
        function loadServer(){
            socket.emit("server:get", [serverid], (response:any) => {
                setServer(response);
            });
        }
        function updateServer(){
            socket.on(`server:updated-server-${serverid}`, data => {
                setServer(data);
            });
        }
        function listenPopups() {
            socket.on(`feature:playerpanel-log`, (message, type, error) => {
                handlePopup(message, type, error)
            });
        }
        loadServer();
        updateServer();
        listenPopups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(function checkServerStatus(){
        socket.on(`server:disable-server-${serverid}`, data => {
            setServer(data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [server]);
    //Panel open
    function handleFeatureClick(panelName: any) {
        if (selectedPlayer !== null && server !== null)
            setLoadedPanel(panelName);
    }
    function handlePlayerClick(player: any){
        setLoadedPanel(null);
        setSelectedPlayer(player);
        if (player === null)
            setLoadedPanel(null);
    }

    //POPUP SYSTEM
    const [popups, setPopUps] = useState<any[]>([]);
    function handlePopup(message: string, severity: string, error: string){
        var popup = {
            Title: "Player Controller",
            Description: message,
            Severity: severity
        }
        setPopUps((popups:any) => [...popups, popup]);
    };
    if(server != null){
        if (server.State === false){
            return <Loading to='/controller/servers/' />
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
                        <FeatureButton title='Operator' description="Instellingen voor het beheren van de operator status van de speler" onClick={() => handleFeatureClick(<OperatorPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Gamemode' description="Pas de gamemode aan van de speler" onClick={() => handleFeatureClick(<GamemodePanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Crash' description="Laat de speler zijn client crashen" onClick={() => handleFeatureClick(<CrashPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Kick' description="Kick de speler van de server" onClick={() => handleFeatureClick(<KickPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Teleport' description="Teleporteer de speler naar een bepaalde locatie" onClick={() => handleFeatureClick(<TeleportPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Whitelist' description="Pas de whitelist status van de speler aan" onClick={() => handleFeatureClick(<WhitelistPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Kill' description="Vermoord de speler" onClick={() => handleFeatureClick(<KillPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Ban' description="Verban de speler van de server" onClick={() => handleFeatureClick(<BanPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Private Message Spam' description="Spam de speler vol met verschillende willekeurige berichten" onClick={() => handleFeatureClick(<PMSpamPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Leaken' description="Leak de gegevens van de speler zijn account" onClick={() => handleFeatureClick(<LeakPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Irriteren' description="Irriteer de speler met wat toys" onClick={() => handleFeatureClick(<IrriterenPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Speler Data' description="Bekijk al de informatie over de speler" onClick={() => handleFeatureClick(<SpelerDataPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Inventory' description="Bekijk en pas de inventarissen van de speler aan" onClick={() => handleFeatureClick(<InventoryPanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Experience' description="Geef de speler experience of verwijder ze" onClick={() => handleFeatureClick(<ExperiencePanel Server={server} player={selectedPlayer} />)} />
                        <FeatureButton title='Armor Customizer' description="Pas het armor van de speler aan" onClick={() => handleFeatureClick(<ArmorPanel Server={server} player={selectedPlayer} />)} />
                    </div>
                    <div className="controller-panel">
                        {
                            loadedPanel !== null && selectedPlayer !== null ?
                            loadedPanel : //Laadt panel in
                            <>Selecteer een speler</> //Laad panel niet in, maar geef instructie
                        }
                    </div>
                    {popups.map((item, i) => {
                        return (
                            <SimplePopup key={i} Title={item.Title} Description={item.Description} Severity={item.Severity}/>
                        );
                    })}
                </div>
            );
        } 
    }else {
        return <Loading to='/controller/servers/' />
    }
}
export default PlayerControllerPage;