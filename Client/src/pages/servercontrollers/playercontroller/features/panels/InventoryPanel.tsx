import { Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './InventoryPanelStyle.scss';
import '../../../../../items/icons-minecraft-0.5.css';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import Item from './inventorycomonents/Item';

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
            Servername: props.server.Address
        }
        socket.emit("client:features-change", data);
    })
    useEffect(function loadItems(){
        fetch(process.env.PUBLIC_URL + '/minecraft-items.json',{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(function(myJson) {
            setItems(myJson);
        });
    }, []);
    function handleButtonClick(type: string){
        setInventoryType(type)
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
                </div>
                <div className='inventorypanel-inventory-current'>
                    
                </div>
                <div className='inventorypanel-inventory-set'>
   
                </div>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default InventoryPanel;