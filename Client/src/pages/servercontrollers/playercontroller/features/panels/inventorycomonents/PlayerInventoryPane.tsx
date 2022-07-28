import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";
import Item from "./Item";

import './PlayerInventoryPaneStyle.scss';

function PlayerInventoryPane(props: {player: any, Server:any, itemList: any[], inventoryAction: any;}){
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    useEffect(() => {
        function loadInventories(){
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", {Type: "get"});
        }
        function updatePlayerInventory(){
            socket.on(`player:get-inventory-${props.player.UUID}`, itemList => {
                var items:any = [];
                itemList.forEach((item: any) => {
                    if (!item.Empty){
                        try{
                            item.ItemstackJson = JSON.parse(item.ItemstackJson); 
                        }catch{}
                    }    
                    items.push(item);
                })
                setInventoryItems(items);
            });
        }
        loadInventories();
        updatePlayerInventory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [draggingItem, setDraggingItem] = useState<any>();
    const [dragOverItem, setDragOverItem] = useState<any>();
    function handleItemStartDragging(item: any){
        console.log("Gestart met item verplaatsen")
        setDraggingItem(item)
    }
    function handleItemDragDrop(){
        console.log("Item changed")

        if (draggingItem !== undefined && dragOverItem !== undefined){
            var data = {
                Type: "swap",
                Slot1: draggingItem.Slot,
                Slot2: dragOverItem.Slot
            }
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", data);

        }
    }
    function handleDragEnter(targetItem: any){
        var newListArrangement: any[] = inventoryItems;

        //DRAGGING ITEM
        var item1:any;
        //TARGET ITEM
        var item2:any;

        newListArrangement.forEach((item:any) => {
            if (item.Slot === draggingItem.Slot)item1 = item;
            if (item.Slot === targetItem.Slot)item2 = item;
        })
        if (item1 === undefined || item2 === undefined)return;
        
        var draggingIndex = newListArrangement.indexOf(item1);
        var targetIndex = newListArrangement.indexOf(item2);
    
        console.log(item1)
        console.log(item2)
        console.log("------")

        //Save previous slot
        item1.ItemstackJson.PreviousSlot = item1.Slot;
        item2.ItemstackJson.PreviousSlot = item2.Slot;

        var copyItemstack = item2.ItemstackJson;

        //Change slot properties
        item2.ItemstackJson = item1.ItemstackJson;
        if (item1.Empty) item2.Empty = true;
        else item2.Empty = false;

        item1.ItemstackJson = copyItemstack;
        if (item2.Empty) item1.Empty = true;
        else item1.Empty = false;

        //Swap both items
        newListArrangement[draggingIndex] = item1;
        newListArrangement[targetIndex] = item2;

        //Update itemlist
        setInventoryItems(newListArrangement);
        setDragOverItem(item2);
    }
    function handleDragLeave(){
        if (dragOverItem !== undefined){
            var newListArrangement: any[] = inventoryItems;

            //DRAGGING ITEM
            var item1:any;
            //DRAG OVER ITEM
            var item2:any;
    
            newListArrangement.forEach((item:any) => {
                if (item.Slot === draggingItem.Slot)item1 = item;
                if (item.Slot === dragOverItem.Slot)item2 = item;
            })
    
            var draggingIndex = newListArrangement.indexOf(item1);
            var dragoverIndex = newListArrangement.indexOf(item2);
    
            //Change slot properties
            item1.Slot = item1.PreviousSlot;
            item1.PreviousSlot = undefined
            item2.Slot = item2.PreviousSlot;
            item2.PreviousSlot = undefined
    
            //Swap both items
            newListArrangement[draggingIndex] = item2;
            newListArrangement[dragoverIndex] = item1;
        }
    }
    return (
        <div className='inventory-panel'>
            <div className="inventory-panel-items">
                {inventoryItems.map((item: any, index: number) => {    
                    if (item.Empty){
                        var sendItem = {
                            Empty: item.Empty,
                            Slot: item.Slot
                        };
                        return <Item 
                            key={index} 
                            slot={item.Slot}
                            itemstack={sendItem} 
                            inventoryAction={props.inventoryAction} 
                            itemStartDragging={handleItemStartDragging}
                            itemDragDrop={handleItemDragDrop}
                            itemDragEnter={handleDragEnter}
                            itemDragLeave={handleDragLeave}
                        />
                    }
                    var rawItem = item.ItemstackJson;
                    rawItem.Empty = item.Empty;
                    rawItem.Slot = item.Slot;
                    props.itemList.forEach((listitem:any) => {
                        if (listitem.id === "minecraft:" + rawItem.type.toString().toLowerCase())
                            rawItem.texture = listitem.texture;         
                    })
                    return <Item 
                        key={index} 
                        slot={item.Slot}
                        itemstack={rawItem} 
                        inventoryAction={props.inventoryAction} 
                        itemStartDragging={handleItemStartDragging}
                        itemDragDrop={handleItemDragDrop}
                        itemDragEnter={handleDragEnter}
                        itemDragLeave={handleDragLeave}
                    />
                })}
            </div>
        </div>
    );
}
export default PlayerInventoryPane; 