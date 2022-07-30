import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useEffect, useState } from 'react';
import Enchanting from './Enchanting';

function SavedItem(props: {item: any, handleItemClick: any;}){
    const [tooltip, setTooltip] = useState<any>(null);
    function stripColor(string: string){
        var noColorString = "";
        for (var i = 0; i < string.length; i++){
            if (string[i] !== "§" && string[i-1] !== "§"){
                noColorString += string[i];
            }
        }
        return noColorString;
    }
    useEffect(function updateItemstack() {
        const itemstack: any = JSON.parse(props.item.Itemstack)
        if (props.item === null){
            setTooltip(null);
        }else{
            var displayname:any;
            if (itemstack.itemmeta !== undefined){
                if (itemstack.itemmeta.displayname !== undefined){
                    displayname = <><span style={{color: "white"}}>Itemname: </span><span style={{ color: "rgb(200, 200, 200)" }}>{stripColor(itemstack.itemmeta.displayname)}</span></>;
                }
            }
            var type = <><span style={{color: "white"}}>Type: </span><span style={{ color: "rgb(200, 200, 200)" }}>{itemstack.type.replaceAll("_", " ").toString().toLowerCase()}</span></>;
            var lore = [];
            if (itemstack.itemmeta !== undefined){
                if (itemstack.itemmeta.lore !== undefined){
                    lore = itemstack.itemmeta.lore;
                }
            }
            setTooltip([
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
                                <div key={index} style={{color: "rgb(200, 200, 200)"}} className="item-lore-line"><span>{"- " + stripColor(line)}</span></div>
                            );
                        })}
                    </div>
                </div>
            ]);
        }
    }, [props.item]);
    if (tooltip == null){
        return <div className="slot"></div>;
    }else {
        const itemstack: any = JSON.parse(props.item.Itemstack)
        return (
            <Menu className='slot-contextmenu' menuButton={
                <Tooltip placement="top" title={tooltip} disableInteractive>  
                    <div className="slot noselect">
                        {itemstack.itemmeta !== undefined && itemstack.itemmeta.enchants !== undefined ? <Enchanting /> : <></>}
                        <img style={{width: 50, height: 50}} src={itemstack.texture} alt="item icon" />
                        <span className='slot-amount'>{itemstack.amount}</span>
                    </div>       
                </Tooltip>
            }>
                <MenuHeader>Optie's</MenuHeader>
                <MenuItem className='slot-context-button' onClick={() => props.handleItemClick("give", props.item)}><FaLocationArrow /><span>Give Item</span></MenuItem>
                <MenuItem className='slot-context-button' onClick={() => props.handleItemClick("edit", props.item)}><FaEdit /><span>Edit item</span></MenuItem>
                <MenuItem className='slot-context-button' onClick={() => props.handleItemClick("remove", props.item)}><FaTrash /><span>Remove Item</span></MenuItem>
            </Menu>
        );
    }
}
export default SavedItem;