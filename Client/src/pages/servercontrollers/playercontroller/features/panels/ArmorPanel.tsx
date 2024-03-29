import './PanelStyle.scss';
import './ArmorPanelStyle.scss';
import { Button, CircularProgress } from '@mui/material';
import { MinecraftSkinViewer } from '@wiicamp/react-minecraft-skin-viewer';
import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import inventoryTextures from './InventoryTextures.json';

import { Menu, MenuItem, MenuDivider, MenuHeader, SubMenu } from "@szhsin/react-menu";
import Enchanting from './inventorycomonents/Enchanting';
import EditItemModal from './armorcomponents/modals/EditItemModal';

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
                        var itemstackJSON: any;
                        if (typeof item.ItemstackJson === 'object' && !Array.isArray(item.ItemstackJson) && item.ItemstackJson !== null)
                            itemstackJSON = item.ItemstackJson;
                        else 
                            itemstackJSON = JSON.parse(item.ItemstackJson);
                        var itemType = "minecraft:" + itemstackJSON.type.toLowerCase();
                        var icon: string = items.filter(function(value) {return value.id === itemType})[0].texture;
                        itemstackJSON.texture = icon;
                        item.ItemstackJson = itemstackJSON;
                        convertedArray.push(item);
                    }
                })
                convertedArray.unshift(convertedArray.pop());
                convertedArray.reverse();
                setArmorItems(convertedArray);
            });
        }
        requestPlayerArmor();
        updatePlayerArmor();
    }, []);
    function getItemFromSlot(slot: number){
        return armorItems.filter(function(value) {return value.Slot === slot})[0];
    }
    function handleUnequipClick(item: any) {
        var data = {
            Type: "unequip",
            Slot: item.Slot
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "armor", data);
    }
    const [editModalIsOpen, setEditModalOpen] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any>(null);
    function handleEditClick(item: any) {
        setEditItem(item)
        setEditModalOpen(true);
    }
    function handleEditModalClose(){
        setEditModalOpen(false);
    }
    function handleItemEdit(item: any){
        var data = {
            Type: "edit",
            Itemstack: JSON.stringify(item),
            Slot: editItem.Slot
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "armor", data);
        handleEditModalClose();
        setEditItem(null);
    }
    function handleDropClick(item: any) {
        var data = {
            Type: "drop",
            Slot: item.Slot
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "armor", data);
    }
    function handleDeleteClick(item: any) {
        var data = {
            Type: "delete",
            Slot: item.Slot
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "armor", data);
    }
    function handleSaveClick(item: any) {
        var saveItem = {
            Servername: props.Server.Servername,
            Itemstack: item.ItemstackJson,
            Player: props.player
        }
        socket.emit("saveditem:new", saveItem);
        socket.emit("feature:player-log", socket.id, "Item opgeslagen in de opslag!", "success");
    }
    function handleArmorClear(){
        var data = {
            Type: "clear"
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "armor", data);
    }
    function handleSkinDownload() {
        forceDownload("https://crafatar.com/skins/" + props.player.UUID + ".png", props.player.Displayname + "_skin_download.png");
        socket.emit("feature:player-log", socket.id, "Je hebt de skin van deze speler gedownload!", "success");
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
                        skin={"https://crafatar.com/skins/" + props.player.UUID + "?default=MHF_Steve"}
                        height={500}
                        width={300}
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
                    <Button 
                        variant="contained"
                        sx={{ width: "100%", marginTop: "10px"} } 
                        onClick={handleSkinDownload}
                    >
                        Download Skin
                    </Button>
                </div>
                <div className='armor-customizer-container-right'>
                    <span className='armor-customizer-container-right-header'>Slots:</span>
                    <div className='armor-customizer-container-right-slots'>
                        {armorItems.map((item: any) => { 
                            var type = ""
                            if (item.Slot === 36)
                                type = "Boots";
                            else if (item.Slot === 37)
                                type = "Leggings";
                            else if (item.Slot === 38)
                                type = "Chestplate";
                            else if (item.Slot === 39)
                                type = "Helmet";
                            else if (item.Slot === 40)
                                type = "Offhand";
                            if (item.Empty){
                                return (
                                    <div className='armor-customizer-slot' key={item.Slot}>
                                        <div className='armor-customizer-slot-container'>  
                                            <div className='armor-customizer-slot-container-item'></div>
                                        </div>
                                        <span className='armor-customizer-slot-name'>{type}</span>
                                    </div>
                                );
                            }
                            return (
                                <div className='armor-customizer-slot' key={item.Slot}>
                                    <div className='armor-customizer-slot-container'>  
                                        <Menu className='item-contextmenu' menuButton={
                                            <div className='armor-customizer-slot-container-item'>
                                                {item.ItemstackJson.itemmeta !== undefined && item.ItemstackJson.itemmeta.enchants !== undefined ? <Enchanting /> : <></>}
                                                {!item.Empty ? <img src={item.ItemstackJson.texture} /> : <CircularProgress />}
                                            </div>
                                       
                                        }>
                                        <MenuHeader>Editing</MenuHeader>
                                        <MenuItem className='item-context-button' onClick={() => handleUnequipClick(item)}>Unequip Item</MenuItem>
                                        <MenuItem className='item-context-button' onClick={() => handleEditClick(item)}>Edit Item</MenuItem>
                                        <MenuDivider />
                                        <MenuHeader>Removing</MenuHeader>
                                        <MenuItem className='item-context-button' onClick={() => handleDropClick(item)}>Drop Item</MenuItem>
                                        <MenuItem className='item-context-button' onClick={() => handleDeleteClick(item)}>Delete Item</MenuItem>
                                        <MenuDivider />
                                        <MenuHeader>Options</MenuHeader>
                                        <SubMenu label="Item Info">
                                            {item.ItemstackJson.itemmeta !== undefined && item.ItemstackJson.itemmeta.displayname !== undefined ? 
                                                <MenuItem className='info'>
                                                    <span>Displayname:</span>
                                                    <span className='info-text'>{item.ItemstackJson.itemmeta.displayname}</span>
                                                </MenuItem> 
                                            : ""}
                                            {item.ItemstackJson.itemmeta !== undefined && item.ItemstackJson.itemmeta.lore !== undefined ? 
                                                <MenuItem className='info'>
                                                    <span>Lore:</span>
                                                    {item.ItemstackJson.itemmeta.lore.map((line: string, index: number) => {
                                                        return (
                                                            <span className='info-text' key={index}>{"- " + line}</span>
                                                        );
                                                    })}
                                                    
                                                </MenuItem> 
                                            : ""}
                                            {item.ItemstackJson.itemmeta !== undefined && item.ItemstackJson.itemmeta.enchants !== undefined ? 
                                                <MenuItem className='info'>
                                                    <span>Enchantments:</span>
                                                    {item.ItemstackJson.itemmeta.enchants.map((enchant: string, index: number) => {
                                                        return (
                                                            <span className='info-text' key={index}>{"- " + enchant}</span>
                                                        );
                                                    })}
                                                    
                                                </MenuItem> 
                                            : ""}
                                        </SubMenu>
                                        <MenuItem className='item-context-button' onClick={() => handleSaveClick(item)}>Save Item</MenuItem>
                                    </Menu>
                                    </div>
                                    <span className='armor-customizer-slot-name'>{type}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {editModalIsOpen && <EditItemModal item={editItem.ItemstackJson} onCancel={handleEditModalClose} onAccept={handleItemEdit} />}
        </>
    );
}
function forceDownload(url: string, fileName: string){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}
export default ArmorPanel;