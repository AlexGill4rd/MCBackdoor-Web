import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useState } from 'react';

function SavedItem(props: {item: any, handleItemClick: any;}){
    const [itemstack, setItemstack] = useState<any>(JSON.parse(props.item.Itemstack))
    if (props.item === null){
        return (
            <div className="item"></div>
        );
    }else{
        const mc = require('minechalk');
        var displayname:any;
        if (itemstack.itemmeta !== undefined){
            if (itemstack.itemmeta.displayname !== undefined){
                displayname = <><span style={{color: "white"}}>Itemname: </span><span style={{ color: "rgb(200, 200, 200)" }}>{mc(itemstack.itemmeta.displayname)}</span></>;
            }
        }
        var type = <><span style={{color: "white"}}>Type: </span><span style={{ color: "rgb(200, 200, 200)" }}>{itemstack.type.replaceAll("_", " ").toString().toLowerCase()}</span></>;
        var lore = [];
        if (itemstack.itemmeta !== undefined){
            if (itemstack.itemmeta.lore !== undefined){
                lore = itemstack.itemmeta.lore;
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
            <Menu className='item-contextmenu' menuButton={
                <Tooltip placement="top" title={tooltip} >
                    <div className="item">
                        <img style={{width: 50, height: 50}} src={itemstack.texture} />
                        <span className='item-amount'>{itemstack.amount}</span>
                    </div>
                </Tooltip>
            }>
                <MenuHeader>Optie's</MenuHeader>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("saved-give", props.item.id)}><FaLocationArrow /><span>Give Item</span></MenuItem>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("saved-edit", props.item.id)}><FaEdit /><span>Edit item</span></MenuItem>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("saved-remove", props.item.id)}><FaTrash /><span>Remove Item</span></MenuItem>
            </Menu>
        );
    }
}
export default SavedItem;