import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";
import EditItemModal from "./Modals/EditItemModal";

import SavedItem from "./SavedItem";

import './SavedItemsPaneStyle.scss';

function SavedItemsPane(props: {player: any;}){

    const [savedItems, setSavedItems] = useState<any | null>([]);
    const [editModalIsOpen, setEditModalOpen] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any>(null);

    useEffect(function loadSavedItems(){
        socket.emit("client:saved-items", props.player.Servername);
    }, []);
    useEffect(function updateSavedItems(){
        socket.on("server:saved-items", data => {
            setSavedItems(data);
        });
    }, []);

    function handleItemClick(type: string, item: any){
        var data = {
            id: item.id,
            Itemstack: item.Itemstack,
            Servername: props.player.Servername,
            Player: props.player,
            Type: type,
            Feature: "item"
        }
        console.log(item);
        if (type === "saved-edit"){
            setEditItem(item);
            setEditModalOpen(true);
        }else socket.emit("client:saved-item-action", data);
    }
    function handleEditModalClose(){
        setEditModalOpen(false);
    }
    function handleItemEdit(item: any){
        var data = {
            id: item.id,
            Itemstack: item,
            Type: "saved-edit"
        }
        socket.emit("client:saved-item-action", data);
        socket.emit("client:saved-items", props.player.Servername);
        handleEditModalClose();
        setEditItem(null);
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
                {editModalIsOpen && <EditItemModal item={editItem} onCancel={handleEditModalClose} onAccept={handleItemEdit} />}
            </div>
        );
    }
}
export default SavedItemsPane; 