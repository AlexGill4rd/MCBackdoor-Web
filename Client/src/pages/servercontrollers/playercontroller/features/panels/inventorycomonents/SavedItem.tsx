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
        return (
            <Menu className='item-contextmenu' menuButton={
                <Tooltip placement="top" title={<div className='item-title'>{"Item Name: " + itemstack.Displayname}</div>}>
                    <div className="item">
                        <img style={{width: 50, height: 50}} src={itemstack.texture} />
                        <span className='item-amount'>{itemstack.Amount}</span>
                    </div>
                </Tooltip>
            }>
                <MenuHeader>Optie's</MenuHeader>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("give", itemstack)}><FaLocationArrow /><span>Give Item</span></MenuItem>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("edit", itemstack)}><FaEdit /><span>Edit item</span></MenuItem>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("remove", itemstack)}><FaTrash /><span>Remove Item</span></MenuItem>
            </Menu>
        );
    }
}
export default SavedItem;