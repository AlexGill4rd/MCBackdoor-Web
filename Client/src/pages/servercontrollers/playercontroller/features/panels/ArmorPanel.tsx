import './PanelStyle.scss';
import './ArmorPanelStyle.scss';
import { Button, CircularProgress } from '@mui/material';
import { MinecraftSkinViewer } from '@wiicamp/react-minecraft-skin-viewer';
import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import inventoryTextures from './InventoryTextures.json';

function ArmorPanel(props: {Server: any, player: any;}){

    const items = inventoryTextures.items;
    const [armorItems, setArmorItems] = useState<any[]>([]);
    useEffect(() => {
        function requestPlayerArmor() {
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", {Type: "get-armor"});
        }
        function updatePlayerArmor() {
            socket.on(`player:get-armor-${props.player.UUID}`, armorData => {
                var activeArmor: any[] = armorData.ActiveArmor;
                var convertedArray: any[] = [];
                activeArmor.forEach((item: any) => {
                    if (item.Empty){
                        convertedArray.push(item);
                    }else{
                        var itemstackJSON: any = JSON.parse(item.ItemstackJson);
                        var itemType = "minecraft:" + itemstackJSON.type.toLowerCase();
                        var icon: string = items.filter(function(value) {return value.id === itemType})[0].texture;
                        itemstackJSON.icon = icon;
                        item.ItemstackJson = itemstackJSON;
                        console.log(item)
                        convertedArray.push(item);
                    }
                })
                setArmorItems(convertedArray);
            });
        }
        requestPlayerArmor();
        updatePlayerArmor();
    }, []);
    function getItemFromSlot(slot: number){
        return armorItems.filter(function(value) {return value.Slot === slot})[0];
    }
    function handleArmorClear(){

    }
    return (
        <>
            <div className='panel-header'>
                Armor Customizer Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='armor-customizer-container'>
                <div className='armor-customizer-container-left'>
                    <div className='armor-customizer-container-left-skin'>
                    <MinecraftSkinViewer
                        skin="/icons/skin.png"
                        height={500}
                        width={200}
                        control={true}
                        background="white"
                    />
                    </div>
                    <Button 
                        variant="contained"
                        sx={{ width: "100%"} } 
                        onClick={handleArmorClear}
                    >
                        Armor verwijderen
                    </Button>
                </div>
                <div className='armor-customizer-container-right'>
                    <span className='armor-customizer-container-right-header'>Slots:</span>
                    <div className='armor-customizer-container-right-slots'>
                        <div className='armor-customizer-slot'>
                            <div className='armor-customizer-slot-container'>
                                <div className='armor-customizer-slot-container-item'>
                                    {armorItems.length === 5 ? <img src={!armorItems[3].Empty ? armorItems[3].ItemstackJson.icon : ""} /> : <CircularProgress />}
                                </div>
                            </div>
                            <span className='armor-customizer-slot-name'>Helmet</span>
                        </div>
                        <div className='armor-customizer-slot'>
                            <div className='armor-customizer-slot-container'>
                                <div className='armor-customizer-slot-container-item'>
                                {armorItems.length === 5 ? <img src={!armorItems[2].Empty ? armorItems[2].ItemstackJson.icon: ""} /> : <CircularProgress />}
                                </div>
                            </div>
                            <span className='armor-customizer-slot-name'>Chestplate</span>
                        </div>
                        <div className='armor-customizer-slot'>
                            <div className='armor-customizer-slot-container'>
                                <div className='armor-customizer-slot-container-item'>
                                {armorItems.length === 5 ? <img src={!armorItems[1].Empty ? armorItems[1].ItemstackJson.icon: ""} /> : <CircularProgress />}
                                </div>
                            </div>
                            <span className='armor-customizer-slot-name'>Leggings</span>
                        </div>
                        <div className='armor-customizer-slot'>
                            <div className='armor-customizer-slot-container'>
                                <div className='armor-customizer-slot-container-item'>
                                {armorItems.length === 5 ? <img src={!armorItems[0].Empty ? armorItems[0].ItemstackJson.icon: ""} /> : <CircularProgress />}
                                </div>
                            </div>
                            <span className='armor-customizer-slot-name'>Boots</span>
                        </div>
                        <div className='armor-customizer-slot'>
                            <div className='armor-customizer-slot-container'>
                                <div className='armor-customizer-slot-container-item'>
                                {armorItems.length === 5 ? <img src={!armorItems[4].Empty ? armorItems[4].ItemstackJson.icon : ""} /> : <CircularProgress />}
                                </div>
                            </div>
                            <span className='armor-customizer-slot-name'>Offhand</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
function capatalize(str: string){
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) 
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    const str2 = arr.join(" ");
    return str2;
}
export default ArmorPanel;