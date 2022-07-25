import { useState } from 'react';
import './MobSpawnerStyle.scss';

import Entities from './mobspawner/Entities';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Tooltip } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

function MobSpawner(props: {Server: any}){

    const [entities, setEntities] = useState<any>(Entities);

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [selectedMob, setSelectedMob] = useState<any>(null);

    const [glow, setGlow] = useState<boolean>(false);
    const [godmode, setGodmode] = useState<boolean>(false);
    const [gravity, setGravity] = useState<boolean>(false);
    const [customname, setCustomname] = useState<boolean>(false);


    function handleMobSpawn(){
        console.log(glow)
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
        setAmount(e.target.value)
    }
    function handleAmountChange(e: any) {
        setAmount(e.target.value)
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
                <div className='mobspawner-settings-name'>
                    <label>Mob Displayname:</label>
                    <input onChange={handleNameChange} type='text' value={name} placeholder="De benaming van de mob..." />
                </div>
                <div className='mobspawner-settings-amount'>
                    <label>Aantal:</label>
                    <input onChange={handleAmountChange} min={1} type='number' value={amount} placeholder="Aantal te spawnen mobs..." />
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