import { CircularProgress, Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import { FaQuidditch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Enchanting from './Enchanting';

function Item(props: {itemstack: any, slot:any, inventoryAction: any, itemStartDragging: any, itemDragDrop: any, itemDragEnter: any;}){
    function stripColor(string: string){
        var noColorString = "";
        for (var i = 0; i < string.length; i++){
            if (string[i] !== "§" && string[i-1] !== "§")
                noColorString += string[i];
        }
        return noColorString;
    }
    if (props.itemstack.Empty){
        return (
            <div className="slot" id={props.itemstack.Slot} onDragOver={function(e: any) {e.preventDefault()}} onDragEnter={() => props.itemDragEnter(true, props.slot)} onDrop={props.itemDragDrop}></div>
        );
    }else{
        var displayname:any;
        if (props.itemstack.itemmeta !== undefined){
            if (props.itemstack.itemmeta.displayname !== undefined){
                displayname = <><span style={{color: "white"}}>Itemname: </span><span style={{ color: "rgb(200, 200, 200)" }}>{stripColor(props.itemstack.itemmeta.displayname)}</span></>;
            }
        }
        var type = <><span style={{color: "white"}}>Type: </span><span style={{ color: "rgb(200, 200, 200)" }}>{props.itemstack.type.replaceAll("_", " ").toString().toLowerCase()}</span></>;
        var lore = [];
        if (props.itemstack.itemmeta !== undefined){
            if (props.itemstack.itemmeta.lore !== undefined){
                lore = props.itemstack.itemmeta.lore;
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
        return (    
            <Menu className='slot-contextmenu' menuButton={
                <Tooltip placement="top" title={tooltip} disableInteractive>  
                    <div className="slot noselect" id={props.itemstack.Slot}>
                        <div className='item' draggable="true" onDragOver={function(e: any) {e.preventDefault()}} onDragStart={(e) => props.itemStartDragging(e, props.itemstack)} onDragEnter={() => props.itemDragEnter(false)} onDrop={props.itemDragDrop} >
                            {props.itemstack.itemmeta !== undefined && props.itemstack.itemmeta.enchants !== undefined ? <Enchanting /> : <></>}
                            {props.itemstack.texture !== undefined ? <img style={{width: 50, height: 50}} src={props.itemstack.texture} alt="Itemstack icon" /> : <CircularProgress />}
                        </div>
                        <span className='slot-amount'>{props.itemstack.amount}</span>
                    </div>       
                </Tooltip>
                }>
                <MenuHeader>Optie's</MenuHeader>
                <MenuItem className='slot-context-button' onClick={() => props.inventoryAction("remove", props.itemstack)}><FaTrash /><span>Remove Item</span></MenuItem>
                <MenuItem className='slot-context-button' onClick={() => props.inventoryAction("duplicate", props.itemstack)}><FaCopy /><span>Duplicate item</span></MenuItem>
                <MenuItem className='slot-context-button' onClick={() => props.inventoryAction("drop", props.itemstack)}><FaQuidditch /><span>Drop Item</span></MenuItem>
                <MenuDivider />
                <MenuHeader>Opslaan</MenuHeader>
                <MenuItem className='slot-context-button' onClick={() => props.inventoryAction("save", props.itemstack)}><FaSave /><span>Save Item</span></MenuItem>
            </Menu>
        );
    }
}
export default Item;