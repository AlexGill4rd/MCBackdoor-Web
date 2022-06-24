import { Tooltip } from '@mui/material';

import './PanelStyle.scss';
import './InventoryPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';
import PlayerInventoryPane from './inventorycomonents/PlayerInventoryPane';
import SavedItemsPane from './inventorycomonents/SavedItemsPane';
import EnderchestPane from './inventorycomonents/EnderchestPane';

function InventoryPanel(props: {Server: any, player: any}){
    const [inventoryType, setInventoryType] = useState<string | null>(null)
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [enderchestInventoryItems, setEnderchestInventoryItems] = useState<any>([]);
    const [items, setItems] = useState<any>([]);
    
    useEffect(() => {
        function loadInventories(){
            loadItems();
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", {Type: "get"});
        }
        function updatePlayerInventory(){
            socket.on(`player:get-inventory-${props.player.UUID}`, itemList => {
                var items:any = [];
                itemList.forEach((item: any) => {
                    if (!item.Empty){
                        try{
                            item.ItemstackJson = JSON.parse(item.ItemstackJson); 
                        }catch{}
                    }    
                    items.push(item);
                })
                setInventoryItems(items);
            });
        }
        function updatePlayerEnderchest(){
            socket.on(`player:get-enderchest-${props.player.UUID}`, itemList => {
                var items:any = [];
                itemList.forEach((item: any) => {
                    if (!item.Empty){
                        try{
                            item.ItemstackJson = JSON.parse(item.ItemstackJson); 
                        }catch{}
                    }    
                    items.push(item);
                })
                setEnderchestInventoryItems(items);
            });
        }
        loadInventories();
        updatePlayerInventory();
        updatePlayerEnderchest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function loadItems(){
        fetch('https://unpkg.com/minecraft-textures@1.18.1/dist/textures/json/1.18.json',{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(function(myJson) {
            setItems(myJson.items)
        });
    };
    function handleButtonClick(type: string){
        setInventoryType(type)
    }
    function inventoryAction(action: string, itemstack: any){
        if (action === "save"){  
            var saveItem = {
                Servername: props.Server.Servername,
                Itemstack: itemstack,
                Player: props.player
            }
            socket.emit("saveditem:new", saveItem);
            socket.emit("feature:player-log", socket.id, "Item opgeslagen in de opslag!", "success");
        }else{
            var data = {
                Type: action,
                Slot: itemstack.Slot,
                Itemstack: itemstack
            }
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", data);
        }
    }
    return (
        <>
            <div className='panel-header'>
                Inventory Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='inventorypanel-container'>
                <div className='inventorypanel-selection'>
                    <Tooltip title='Open de inventaris van de speler' onClick={() => handleButtonClick("default")}>
                        <div className='inventorypanel-selection-button'>Default Inventory</div>
                    </Tooltip>
                    <Tooltip title='Open de inventaris van de speler' onClick={() => handleButtonClick("enderchest")}>
                        <div className='inventorypanel-selection-button'>Ender Chest Inventory</div>
                    </Tooltip>
                    <Tooltip title='Bekijk de opgeslagen items' onClick={() => handleButtonClick("saved")}>
                        <div className='inventorypanel-selection-button'>Opgeslagen Items</div>
                    </Tooltip>
                </div>
                {inventoryType === "default" ? <PlayerInventoryPane items={inventoryItems} itemList={items} inventoryAction={inventoryAction} /> : <></>}
                {inventoryType === "enderchest" ? <EnderchestPane items={enderchestInventoryItems} itemList={items} inventoryAction={inventoryAction}  /> : <></>}
                {inventoryType === "saved" ? <SavedItemsPane player={props.player} /> : <></>}    
            </div>
            
        </>
    );
}
export default InventoryPanel;