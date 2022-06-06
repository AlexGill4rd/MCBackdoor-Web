import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './InventoryPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';
import Item from './inventorycomonents/Item';
import PlayerInventoryPane from './inventorycomonents/PlayerInventoryPane';
import SavedItemsPane from './inventorycomonents/SavedItemsPane';

function InventoryPanel(props: {player: any, server: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");
    useEffect(function listenMessages(){
        socket.on(`server:features-change-message`, data => {
            if (data.includes("fout"))setError(true);
            else setError(false);
            setInfoMessage(data);
        })
    }, []);
    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }

    const [inventoryType, setInventoryType] = useState<string | null>(null)
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [items, setItems] = useState<any>([]);
    
    useEffect(function loadInventories(){
        var data = {
            Player: props.player,
            Feature: "inventory",
            Type: "get",
            Servername: props.server.Address
        }
        loadItems();
        socket.emit("client:features-change", data);
    }, []);
    useEffect(function updatePlayerInventory(){
        socket.on("server:player-inventory", data => {
            if (data.PlayerUUID === props.player.UUID){
                var items:any = [];
                data.Items.map((item: any) => {
                    if (item.Empty === true)
                        items.push(item);
                    else{
                        item.ItemstackJson = JSON.parse(item.ItemstackJson);
                        items.push(item)
                    }
                })
                setInventoryItems(items);
            } 
        });
    })
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
    function inventoryAction(action: string, slot: number, itemstack: any){
        var data = {
            Player: props.player,
            Feature: "inventory",
            Type: action,
            Slot: slot,
            Servername: props.server.Address,
            Itemstack: itemstack
        }
        if (action === "save"){
            var saveItem = {
                Servername: props.server.Address,
                Itemstack: itemstack,
                Player: props.player,
                Datum: new Date()
            }
            socket.emit("client:save-item", saveItem);
            setInfoMessage("Je hebt het item opgeslagen!");
        }else{
            socket.emit("client:features-change", data);
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
                {inventoryType === "enderchest" ? <PlayerInventoryPane items={inventoryItems} itemList={items} inventoryAction={inventoryAction}  /> : <></>}
                {inventoryType === "saved" ? <SavedItemsPane player={props.player} /> : <></>}
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default InventoryPanel;