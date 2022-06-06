import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import { FaQuidditch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

function Item(props: {itemstack: any, inventoryAction: any;}){
    const mc = require('minechalk');
    if (props.itemstack === undefined){
        return (
            <div className="item"></div>
        );
    }else{
        var displayname:any;
        if (props.itemstack.itemmeta !== undefined){
            if (props.itemstack.itemmeta.displayname !== undefined){
                displayname = <><span style={{color: "white"}}>Itemname: </span><span style={{ color: "rgb(200, 200, 200)" }}>{mc(props.itemstack.itemmeta.displayname)}</span></>;
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
            <div key={0} className='item-tooltip'>
                <div className='item-title'>
                    {displayname !== "" && displayname}
                </div>
                <div className='item-type'>
                    {type}
                </div>
                <div className='item-lore'>
                    {lore.length > 0 && <div>Lore:</div>}
                    {lore.map((line:string, index: number) => {
                            return (
                            <div key={index} style={{color: "rgb(200, 200, 200)"}} className="item-lore-line"><span>{"- " + mc(line)}</span></div>
                        );
                    })}
                </div>
            </div>
        ]
        return (
            <div>
                <Menu className='item-contextmenu' menuButton={
                    <Tooltip placement="top" title={tooltip}>
                        <div className="item">
                            <img style={{width: 50, height: 50}} src={props.itemstack.texture} />
                            <span className='item-amount'>{props.itemstack.amount}</span>
                        </div>
                </Tooltip>
                }>
                    <MenuHeader>Optie's</MenuHeader>
                    <MenuItem className='item-context-button' onClick={() => props.inventoryAction("remove", props.itemstack.Slot)}><FaTrash /><span>Remove Item</span></MenuItem>
                    <MenuItem className='item-context-button' onClick={() => props.inventoryAction("duplicate", props.itemstack.Slot)}><FaCopy /><span>Duplicate item</span></MenuItem>
                    <MenuItem className='item-context-button' onClick={() => props.inventoryAction("drop", props.itemstack.Slot)}><FaQuidditch /><span>Drop Item</span></MenuItem>
                    <MenuDivider />
                    <MenuHeader>Opslaan</MenuHeader>
                    <MenuItem className='item-context-button' onClick={() => props.inventoryAction("save", props.itemstack.Slot, props.itemstack)}><FaSave /><span>Save Item</span></MenuItem>
                </Menu>
            </div>
        );
    }
}
export default Item;