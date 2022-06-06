import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";

import SavedItem from "./SavedItem";

import './SavedItemsPaneStyle.scss';

function SavedItemsPane(props: {player: any;}){

    const [savedItems, setSavedItems] = useState<any[] | null>([]);

    useEffect(function loadSavedItems(){
        console.log(props.player.Servername)
        socket.emit("client:saved-items", props.player.Servername);
    }, []);
    useEffect(function updateSavedItems(){
        socket.on("server:saved-items", data => {
            setSavedItems(data);
        });
    }, []);

    function handleItemClick(type: string, itemstack: any){
        var data = {
            Itemstack: itemstack,
            Player: props.player,
            Type: type,
            Feature: "item"
        }
        socket.emit("client:saved-item-action", data);
    }

    if (savedItems === null){
        return <>Geen items opgeslagen op dit moment!</>
    }else{
        return (
            <div className='inventory-panel'>
                <div className="inventory-panel-items">
                    {savedItems.map((item: any, index: number) => {
                        return <SavedItem key={index} item={item} handleItemClick={handleItemClick} />
                    })}
                </div>
            </div>
        );
    }
}
export default SavedItemsPane; 