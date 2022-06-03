import { Tooltip } from '@mui/material';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import { FaQuidditch } from 'react-icons/fa';

function Item(props){

    function handleClick(e, data) {
        console.log(`Clicked on menu ${data.type}`)
    }

    if (props.itemstack === null || props.itemstack.texture === undefined){
        return (
            <div className="item"></div>
        );
    }else{
        return (
            <div>
                <Tooltip title={<div className='item-tooltip'><div className='item-title'>{"Item Name: " + props.itemstack.Displayname}</div><div className='item-lore'>{props.itemstack.Lore === "none" || props.itemstack.Lore === undefined ? <></> : "Item Lore: " + props.itemstack.Lore}</div></div>}>
                <ContextMenuTrigger id="item-menu">
                    <div className="item">
                        <img style={{width: 50, height: 50}} src={props.itemstack.texture} />
                        <span className='item-amount'>{props.itemstack.Amount}</span>
                    </div>
                </ContextMenuTrigger>
            </Tooltip>
            <ContextMenu id="item-menu" className='item-menu-buttons'>
                <MenuItem data={{type: 'Remove'}} onClick={handleClick} className='item-menu-button'>
                    <FaTrash /><span>Remove Item</span>
                </MenuItem>
                <MenuItem data={{type: 'Duplicate'}} onClick={handleClick} className='item-menu-button'>
                    <FaCopy /><span>Duplicate item</span>
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{type: 'Drop'}} onClick={handleClick} className='item-menu-button'>
                    <FaQuidditch /><span>Drop Item</span>
                </MenuItem>
            </ContextMenu>
            </div>
        );
    }
}
export default Item;