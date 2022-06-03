import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

function Item(props: {itemstack: any;}){
    if (props.itemstack === null || props.itemstack.texture === undefined){
        return (
            <div className="item"></div>
        );
    }else{
        return (
            <Tooltip title={<div className='item-tooltip'><div className='item-title'>{"Item Name: " + props.itemstack.Displayname}</div><div className='item-lore'>{props.itemstack.Lore === "none" || props.itemstack.Lore === undefined ? <></> : "Item Lore: " + props.itemstack.Lore}</div></div>}>
                <div className="item">
                    <img style={{width: 50, height: 50}} src={props.itemstack.texture} />
                    <span className='item-amount'>{props.itemstack.Amount}</span>
                </div>
            </Tooltip>
        );
    }
}
export default Item;