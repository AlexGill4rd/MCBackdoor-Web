import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import { FaQuidditch } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

function Item(props: {itemstack: any, inventoryAction: any;}){

    if (props.itemstack === null || props.itemstack.texture === undefined){
        return (
            <div className="item"></div>
        );
    }else{
        return (
            <div>
                <Menu className='item-contextmenu' menuButton={
                    <Tooltip placement="top" title={<div className='item-tooltip'><div className='item-title'>{"Item Name: " + props.itemstack.Displayname}</div><div className='item-lore'>{props.itemstack.Lore === "none" || props.itemstack.Lore === undefined ? <></> : "Item Lore: " + props.itemstack.Lore}</div></div>}>
                        <div className="item">
                            <img style={{width: 50, height: 50}} src={props.itemstack.texture} />
                            <span className='item-amount'>{props.itemstack.Amount}</span>
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