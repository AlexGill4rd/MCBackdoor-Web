import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";

import SavedItem from "./SavedItem";

import './SavedItemsPaneStyle.scss';

function SavedItemsPane(props: {player: any;}){

    const [savedItems, setSavedItems] = useState<any | null>([]);

    useEffect(function loadSavedItems(){
        socket.emit("client:saved-items", props.player.Servername);
    }, []);
    useEffect(function updateSavedItems(){
        socket.on("server:saved-items", data => {
            setSavedItems(data);
        });
    }, []);

    function handleItemClick(type: string, id: number){
        var data = {
            id: id,
            Player: props.player,
            Type: type,
            Feature: "item"
        }
        socket.emit("client:saved-item-action", data);
    }
    if (savedItems?.length <= 0){
        return <>Geen items opgeslagen op dit moment!</>
    }else{
        return (
            <div className='inventorypanel'>
                <div className="inventorypanel-items">
                    {savedItems.map((item: any, index: number) => {
                        return <SavedItem key={index} item={item} handleItemClick={handleItemClick} />
                    })}
                </div>
            </div>
        );
    }
}
export default SavedItemsPane; 