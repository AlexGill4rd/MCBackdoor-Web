import { Tooltip } from '@mui/material';
import './ItemStyle.scss';

import { FaTrash } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useEffect, useState } from 'react';

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
        return <div className="item"></div>;
    }else {
        const itemstack: any = JSON.parse(props.item.Itemstack)
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
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("saved-give", props.item)}><FaLocationArrow /><span>Give Item</span></MenuItem>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("saved-edit", props.item)}><FaEdit /><span>Edit item</span></MenuItem>
                <MenuItem className='item-context-button' onClick={() => props.handleItemClick("saved-remove", props.item)}><FaTrash /><span>Remove Item</span></MenuItem>
            </Menu>
        );
    }
}
export default SavedItem;