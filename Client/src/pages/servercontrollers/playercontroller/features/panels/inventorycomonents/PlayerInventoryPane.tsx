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
    const [originalSlot, setOriginalSlot] = useState<number>();

    function handleItemStartDragging(item: any){
        console.log("Gestart met item verplaatsen")
        setDraggingItem(item)
        setOriginalSlot(item.Slot)
    }
    function handleDragEnter(hoverTarget: any){
        if (hoverTarget.Slot === draggingItem.Slot)return;
        console.log("Entered other zone")
        swapItems(draggingItem, hoverTarget)
    }
    function handleDragLeave(){
        if (dragOverItem === undefined)return;
        console.log("Left")
        swapItems(draggingItem, dragOverItem)
    }
    function swapItems(item1: any, item2: any){
        console.log(item1)
        console.log(item2)
        console.log("-")
        var itemSlot1 = item1.Slot;
        var itemSlot2 = item2.Slot;

        var slot1 = getItemFromSlot(itemSlot1);
        var slot2 = getItemFromSlot(itemSlot2);

        var slot1Index = inventoryItems.indexOf(slot1)
        var slot2Index = inventoryItems.indexOf(slot2)

        item2.Slot = itemSlot1;
        item1.Slot = itemSlot2;

        slot1.ItemstackJson = item2;
        slot2.ItemstackJson = item1;

        var newInventory: any[] = inventoryItems;
        newInventory[slot1Index] = slot1;
        newInventory[slot2Index] = slot2;

        setDragOverItem(slot1.ItemstackJson);
        setDraggingItem(slot2.ItemstackJson);
        setInventoryItems(newInventory)
    }
    function handleItemDragDrop(){
        console.log("Item changed")
        if (dragOverItem !== undefined)
            updateClientInventory(draggingItem, dragOverItem)
    }
    function updateClientInventory(item1: any, item2: any) {
        var data = {
            Type: "swap",
            Slot1: item1.Slot,
            Slot2: item2.Slot
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", data);
    }
    function getItemFromSlot(slot: number){
        var itemFound: any = undefined;
        inventoryItems.forEach((item: any) => {
            if (item.Slot === slot) itemFound = item;
        });
        return itemFound;
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