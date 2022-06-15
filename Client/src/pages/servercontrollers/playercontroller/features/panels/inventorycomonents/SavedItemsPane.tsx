import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";
import EditItemModal from "./Modals/EditItemModal";

import SavedItem from "./SavedItem";

import './SavedItemsPaneStyle.scss';

function SavedItemsPane(props: {player: any;}){

    const [savedItems, setSavedItems] = useState<any | null>([]);
    const [editModalIsOpen, setEditModalOpen] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [shownItems, setShownItems] = useState<any | null>([]);

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
    const [searchTerm, setSearchTerm] = useState<any>("");
    function handleSearchChange(e: any) {
        setSearchTerm(e.target.value)
    }
    useEffect(() => {
        updateEnchants();
    }, [searchTerm]);
    useEffect(() => {
        updateEnchants();
    }, [savedItems]);
    function updateEnchants(){
        setShownItems([]);
        savedItems.map((item: any) => {
            var itemstack = JSON.parse(item.Itemstack);
            if (searchTerm === "" || itemstack.type.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())){
                setShownItems((shownItems: any) => [...shownItems, item]);
            }
        })
    }
    if (savedItems?.length <= 0){
        return <>Geen items opgeslagen op dit moment!</>
    }else{
        return (
            <div className='inventorypanel'>
                <div className="inventorypanel-search">
                    <label className='editmodal-menu-kop'>Zoek naar een item:</label>
                    <input type="text" onChange={handleSearchChange} value={searchTerm} id="lsearch" name="search" placeholder="Zoek naar een item..." />
                </div>
                <div className="inventorypanel-items">
                    {shownItems.map((item: any, index: number) => {
                        return <SavedItem key={index} item={item} handleItemClick={handleItemClick} />
                    })}
                </div>
                {editModalIsOpen && <EditItemModal item={editItem} onCancel={handleEditModalClose} onAccept={handleItemEdit} />}
            </div>
        );
    }
}
export default SavedItemsPane; 