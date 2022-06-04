import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";

import SavedItem from "./SavedItem";

import './SavedItemsPaneStyle.scss';

function SavedItemsPane(props: {player: any;}){

    const [savedItems, setSavedItems] = useState<any[] | null>(null);

    useEffect(function loadSavedItems(){
        socket.emit("client:saved-items", props.player.Servername);
    }, []);
    useEffect(function updateSavedItems(){
        socket.on("server:saved-items", data => {
            setSavedItems(data);
        });
    }, []);

    function handleItemClick(type: string, itemstack: any){
        if (type === "give"){
            console.log("Give item:")
            console.log(itemstack);
        }else if (type === "edit"){
            console.log("Edit item:")
            console.log(itemstack);
        }else if (type === "remove"){
            console.log("Remove item:")
            console.log(itemstack);
        }
    }

    if (savedItems === null){
        return <>Geen items opgeslagen op dit moment!</>
    }else{
        return (
            <div className='saveditems-panel'>
                {savedItems.map((item: any, index: number) => {
                    return <SavedItem key={index} item={item} handleItemClick={handleItemClick} />
                })}
            </div>
        );
    }
}
export default SavedItemsPane; 