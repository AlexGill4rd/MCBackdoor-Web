import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";
import EditItemModal from "./Modals/EditItemModal";

import SavedItem from "./SavedItem";

import './SavedItemsPaneStyle.scss';

function SavedItemsPane(props: {player: any;}){

    const [savedItems, setSavedItems] = useState<any>([]);
    const [editModalIsOpen, setEditModalOpen] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any>(null);
    const [shownItems, setShownItems] = useState<any | null>([]);

    useEffect(function loadSavedItems(){
        socket.emit("saveditem:request-list");
    }, []);
    useEffect(function loadSavedItems(){
        socket.on("saveditem:list", data => {
            setSavedItems(data)
        });
    }, []);

    function handleItemClick(type: string, item: any){
        switch (type){
            case "edit":
                setEditItem(item);
                setEditModalOpen(true);
                break;
            case "remove":
                var data = {
                    id: item.id,
                    Itemstack: item.Itemstack,
                    Servername: props.player.Servername,
                    Type: type,
                }
                socket.emit("saveditem:action", data);
                break;
            case "give":
                var giveJSON = {
                    Itemstack: item.Itemstack,
                    Type: "give",
                }
                socket.emit("feature:player", socket.id, props.player.Servername, props.player.UUID, "saveditem", giveJSON);
                break;
        }
    }
    function handleEditModalClose(){
        setEditModalOpen(false);
    }
    function handleItemEdit(item: any){
        var data = {
            id: item.id,
            Itemstack: item,
            Servername: props.player.Servername,
            Type: "edit"
        }
        socket.emit("saveditem:action", data);
        handleEditModalClose();
        setEditItem(null);
    }
    const [searchTerm, setSearchTerm] = useState<any>("");
    function handleSearchChange(e: any) {
        setSearchTerm(e.target.value)
    }
    useEffect(() => {
        updateEnchants();
    }, [savedItems, searchTerm]);
    function updateEnchants(){
        setShownItems([]);
        savedItems.map((item: any) => {
            var itemstack = JSON.parse(item.Itemstack);
            if (searchTerm === "" || itemstack.type.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())){
                setShownItems((shownItems: any) => [...shownItems, item]);
            }
        })
    }
    if (savedItems.length <= 0){
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