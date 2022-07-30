import { CircularProgress, Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import { FaQuidditch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Enchanting from './Enchanting';

function Item(props: {Type: any, Itemstack: any, Slot:any, InventoryAction: any, ItemStartDragging: any, ItemDragDrop: any, ItemDragEnter: any;}){
    function stripColor(string: string){
        var noColorString = "";
        for (var i = 0; i < string.length; i++){
            if (string[i] !== "§" && string[i-1] !== "§")
                noColorString += string[i];
        }
        return noColorString;
    }
    if (props.Itemstack.Empty){
        return (
            <div className="slot" id={props.Itemstack.Slot} onDragOver={function(e: any) {e.preventDefault()}} onDragEnter={() => props.ItemDragEnter(true, props.Slot)} onDrop={props.ItemDragDrop}></div>
        );
    }else{
        var displayname:any;
        if (props.Itemstack.itemmeta !== undefined){
            if (props.Itemstack.itemmeta.displayname !== undefined){
                displayname = <><span style={{color: "white"}}>Itemname: </span><span style={{ color: "rgb(200, 200, 200)" }}>{stripColor(props.Itemstack.itemmeta.displayname)}</span></>;
            }
        }
        var type = <><span style={{color: "white"}}>Type: </span><span style={{ color: "rgb(200, 200, 200)" }}>{props.Itemstack.type.replaceAll("_", " ").toString().toLowerCase()}</span></>;
        var lore = [];
        if (props.Itemstack.itemmeta !== undefined){
            if (props.Itemstack.itemmeta.lore !== undefined){
                lore = props.Itemstack.itemmeta.lore;
            }
        }
        var tooltip = [
            <div key={0} className='slot-tooltip'>
                <div className='slot-title'>
                    {displayname !== "" && displayname}
                </div>
                <div className='slot-type'>
                    {type}
                </div>
                <div className='slot-lore'>
                    {lore.length > 0 && <div>Lore:</div>}
                    {lore.map((line:string, index: number) => {
                            return (
                            <div key={index} style={{color: "rgb(200, 200, 200)"}} className="item-lore-line"><span>{"- " + stripColor(line)}</span></div>
                        );
                    })}
                </div>
            </div>
        ]
        var removeAction = (props.Type === "enderchest") ? "ender-remove" : "remove";
        var duplicateAction = (props.Type === "enderchest") ? "ender-duplicate" : "duplicate";
        var dropAction = (props.Type === "enderchest") ? "ender-drop" : "drop";
        return (    
            <Menu className='slot-contextmenu' menuButton={
                <Tooltip placement="top" title={tooltip} disableInteractive>  
                    <div className="slot noselect" id={props.Itemstack.Slot}>
                        <div className='item' draggable="true" onDragOver={function(e: any) {e.preventDefault()}} onDragStart={(e) => props.ItemStartDragging(e, props.Itemstack)} onDragEnter={() => props.ItemDragEnter(false)} onDrop={props.ItemDragDrop} >
                            {props.Itemstack.itemmeta !== undefined && props.Itemstack.itemmeta.enchants !== undefined ? <Enchanting /> : <></>}
                            {props.Itemstack.texture !== undefined ? <img style={{width: 50, height: 50}} src={props.Itemstack.texture} alt="Itemstack icon" /> : <CircularProgress />}
                        </div>
                        <span className='slot-amount'>{props.Itemstack.amount}</span>
                    </div>       
                </Tooltip>
                }>
                <MenuHeader>Optie's</MenuHeader>
                <MenuItem className='slot-context-button' onClick={() => props.InventoryAction(removeAction, props.Itemstack)}><FaTrash /><span>Remove Item</span></MenuItem>
                <MenuItem className='slot-context-button' onClick={() => props.InventoryAction(duplicateAction, props.Itemstack)}><FaCopy /><span>Duplicate item</span></MenuItem>
                <MenuItem className='slot-context-button' onClick={() => props.InventoryAction(dropAction, props.Itemstack)}><FaQuidditch /><span>Drop Item</span></MenuItem>
                <MenuDivider />
                <MenuHeader>Opslaan</MenuHeader>
                <MenuItem className='slot-context-button' onClick={() => props.InventoryAction("save", props.Itemstack)}><FaSave /><span>Save Item</span></MenuItem>
            </Menu>
        );
    }
}
export default Item;