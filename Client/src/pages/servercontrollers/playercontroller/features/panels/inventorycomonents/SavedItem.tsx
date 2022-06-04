import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

function SavedItem(props: {item: any, handleItemClick: any;}){

    if (props.item === null || props.item.texture === undefined){
        return (
            <div className="item"></div>
        );
    }else{
        return (
            <div>
                <Menu menuButton={
                    <Tooltip placement="top" title={<div className='item-title'>{"Item Name: " + props.item.itemstack.Displayname}</div>}>
                        <div className="item">
                            <img style={{width: 50, height: 50}} src={props.item.itemstack.texture} />
                            <span className='item-amount'>{props.item.itemstack.Amount}</span>
                        </div>
                    </Tooltip>
                }>
                    <MenuHeader>Optie's</MenuHeader>
                    <MenuItem className='item-context-button' onClick={() => props.handleItemClick("give", props.item.itemstack)}><FaLocationArrow /><span>Give Item</span></MenuItem>
                    <MenuItem className='item-context-button' onClick={() => props.handleItemClick("edit", props.item.itemstack)}><FaEdit /><span>Edit item</span></MenuItem>
                    <MenuDivider />
                    <MenuHeader>Delete</MenuHeader>
                    <MenuItem className='item-context-button' onClick={() => props.handleItemClick("remove", props.item.itemstack)}><FaTrash /><span>Remove Item</span></MenuItem>
                </Menu>
            </div>
        );
    }
}
export default SavedItem;