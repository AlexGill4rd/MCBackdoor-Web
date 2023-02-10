import { useEffect, useState } from 'react';
import './MobSpawnerStyle.scss';

import Entities from './mobspawner/Entities';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Tooltip } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import { socket } from '../../../../socket/socket';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";

function MobSpawner(props: {Server: any}){

    const [entities, setEntities] = useState<any>(Entities);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [location, setLocation] = useState<string>("");
    const [selectedMob, setSelectedMob] = useState<any>(null);

    const [glow, setGlow] = useState<boolean>(false);
    const [godmode, setGodmode] = useState<boolean>(false);
    const [gravity, setGravity] = useState<boolean>(false);
    const [customname, setCustomname] = useState<boolean>(false);

    const [worlds, setWorlds] = useState<any[]>([]);
    const [selectedWorld, setSelectedWorld] = useState<any>();
    const [players, setPlayers] = useState<any>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<any>();

    useEffect(() => {
        function requestWorlds(){
            socket.emit("feature:server", socket.id, props.Server.Servername, "world-list", {})
        }
        function loadWorlds(){
            socket.on(`server:get-worlds`, data => {
                setWorlds(data)
            })
        }
        function loadPlayers(){
            socket.emit("feature:server", socket.id, props.Server.Servername, "playerlist", {})
        }
        function updatePlayers(){
            socket.on(`server:get-playerlist-${props.Server.id}`, players => {
                setPlayers(players);
            })
        }
        loadPlayers();
        updatePlayers();
        requestWorlds();
        loadWorlds();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleMobSpawn(){
        if (selectedWorld !== undefined && location.split(",").length !== 3){
            return
        }
        if (selectedWorld !== undefined || selectedPlayer !== undefined){
            if (name === ""){
                var nameFormat = capatalize(selectedMob.name.replace("_", " "))
                setName(nameFormat)
            }
            var data = {
                displayname: name,
                amount: amount,
                mobtype: selectedMob.name,
                settings: {
                    glow: glow,
                    godmode: godmode,
                    gravity: gravity,
                    customname: customname,
                    passenger: "-"
                },
                location: {
                    world: selectedWorld,
                    player: selectedPlayer,
                    coords: location
                }
            }
            socket.emit("feature:server", socket.id, props.Server.Servername, "mobspawner", data);
        }
        
    }
    function handleMobClick(entity: any){
        if (selectedMob === entity)
            setSelectedMob(null)
        else{
            setSelectedMob(entity)
            var name = capatalize(entity.name.replace("_", " "));
            setName(name)
            setAmount(1)
        }
    }
    function handleNameChange(e: any){
        setName(e.target.value)
    }
    function handleAmountChange(e: any) {
        setAmount(e.target.value)
    }
    function handleLocationChange(e: any) {
        setLocation(e.target.value)
    }
    function handleWorldSelect(world: string){
        setSelectedPlayer(undefined)
        setSelectedWorld(world)
    }
    function handlePlayerSelect(player: any){
        setSelectedWorld(undefined)
        setSelectedPlayer(player)
    }
    return (
        <div className='mobspawner'>
            <div className='mobspawner-mobs'>
                <div className='mobspawner-mobs-list'>
                    {entities.map((entity: any) => {
                        var name = capatalize(entity.name.replace("_", " "));
                        if (checkUppercase(entity.name)){
                            return (
                                <div key={entity.name} className='mobspawner-mobs-list-mob' style={{backgroundColor: 'red'}}>
                                    <Tooltip title={name} disableInteractive placement='top'>
                                        <img src={entity.icon} />
                                    </Tooltip>
                                </div>
                            );
                        }else{
                            return (
                                <div onClick={() => handleMobClick(entity)} key={entity.name} className='mobspawner-mobs-list-mob' style={selectedMob === entity ? {backgroundColor: "lime"} : {}}>
                                    <Tooltip title={name} disableInteractive placement='top'>
                                        <img src={entity.icon} />
                                    </Tooltip>
                                </div>
                            );
                        }  
                    })}
                </div>
            </div>
            {selectedMob && 
            <div className='mobspawner-settings'>
            <form onSubmit={handleMobSpawn}>
                <div className='mobspawner-settings-setting'>
                    <label>Mob Displayname:</label>
                    <input onChange={handleNameChange} type='text' value={name} placeholder="De benaming van de mob..." />
                </div>
                <div className='mobspawner-settings-setting'>
                    <label>Aantal:</label>
                    <input onChange={handleAmountChange} min={1} type='number' value={amount} placeholder="Aantal te spawnen mobs..." />
                </div>
                <div className='mobspawner-settings-setting'>
                    <label>Location (x, y, z):</label>
                    <input onChange={handleLocationChange} type='text' value={location} placeholder="Geef een locatie... ('x, y, z')" />
                    <div className='mobspawner-settings-setting-selection'>
                        <Menu className='item-contextmenu' menuButton={
                            <Tooltip placement="top" title="Selecteer een wereld" disableInteractive>  
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        margin: "5px 5px 0 0"
                                    }}
                                >
                                    {selectedWorld === undefined ? "Select world" : selectedWorld.Worldname}
                                </Button>   
                            </Tooltip>
                        }>
                            <MenuHeader>Worlds</MenuHeader>
                            {worlds.map((world: any) => {
                                return (
                                    <MenuItem key={world.Worldname} className='item-context-button' onClick={() => handleWorldSelect(world)}>{world.Worldname}</MenuItem>
                                );
                            })}
                        </Menu>
                        <Menu className='item-contextmenu' menuButton={
                            <Tooltip placement="top" title="Selecteer een wereld" disableInteractive>  
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        margin: "5px 0 0 5px"
                                    }}
                                >
                                    {selectedPlayer === undefined ? "Select player" : selectedPlayer.Displayname}
                                </Button>   
                            </Tooltip>
                        }>
                            <MenuHeader>Players</MenuHeader>
                            {players.map((player: any) => {
                                return (
                                    <MenuItem key={player.UUID} className='item-context-button' onClick={() => handlePlayerSelect(player)}>{player.Displayname}</MenuItem>
                                );
                            })}
                        </Menu>
                    </div>
                </div>
                <FormLabel id="demo-radio-buttons-group-label">Instellingen</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        onChange={(e: any) => {
                            setGlow(e.target.checked)
                        }}
                        control={<Checkbox name="gilad" />}
                        label="Glow"
                    />
                    <FormControlLabel
                        onChange={(e: any) => {
                            setGodmode(e.target.checked)
                        }}
                        control={<Checkbox name="gilad" />}
                        label="Godmode"
                    />
                    <FormControlLabel
                        onChange={(e: any) => {
                            setGravity(e.target.checked)
                        }}
                        control={<Checkbox name="gilad" />}
                        label="Gravity"
                    />
                    <FormControlLabel
                        onChange={(e: any) => {
                            setCustomname(e.target.checked)
                        }}
                        control={<Checkbox name="gilad" />}
                        label="Customname"
                    />
                </FormGroup>
                <Button 
                    variant="contained" 
                    startIcon={<TelegramIcon />}
                    onClick={handleMobSpawn}
                    sx={{
                        width: 350
                    }}
                >
                    Spawn Mobs
                </Button> 
            </form>
        </div>
        }
        </div>
    );
}
function capatalize(str: string){
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) 
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    const str2 = arr.join(" ");
    return str2;
}
function checkUppercase(str: string){
    for (var i=0; i<str.length; i++){
      if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
        return true;
      }
    }
    return false;
};
export default MobSpawner;