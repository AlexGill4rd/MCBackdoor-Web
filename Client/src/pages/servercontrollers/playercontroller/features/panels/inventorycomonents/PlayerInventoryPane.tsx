import { useEffect, useState } from "react";
import { socket } from "../../../../../../socket/socket";
import Item from "./Item";

import './PlayerInventoryPaneStyle.scss';

function PlayerInventoryPane(props: {player: any, Server:any, itemList: any[], inventoryAction: any;}){
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    useEffect(() => {
        function loadInventories(){
            socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", {Type: "get-inventory"});
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
    const [dragElement, setDragElement] = useState<any>();
    const [originalSlot, setOriginalSlot] = useState<number>();

    function handleItemStartDragging(e:any, item: any){
        setDraggingItem(item)
        setOriginalSlot(item.Slot)
        setDragElement(e.currentTarget);
        e.currentTarget.classList.add('dragging');
    }
    function handleDragEnter(empty: boolean, slot: number){
        if (empty && slot !== undefined){
            moveItem(draggingItem, slot)
        }
    }

    function moveItem(itemstack: any, slot: number){
        var newInventory: any[] = inventoryItems;

        var moveToSlot:any = getItemFromSlot(newInventory, slot)
        var currentSlot:any = getItemFromSlot(newInventory, itemstack.Slot)
        
        if (moveToSlot.Empty){
            var moveSlotIndex: number = newInventory.indexOf(moveToSlot);
            var itemstackIndex: number = newInventory.indexOf(currentSlot);

            itemstack.Slot = slot;

            moveToSlot.ItemstackJson = itemstack;
            delete(currentSlot.ItemstackJson)
            currentSlot.Empty = true;
            moveToSlot.Empty = false;

            newInventory[moveSlotIndex] = moveToSlot;
            newInventory[itemstackIndex] = currentSlot;
            
            var bugVar = newInventory.slice();
            setInventoryItems(bugVar);
        }
    }
    function handleItemDragDrop(){
        if (originalSlot !== undefined){
            if (!getItemFromSlot(inventoryItems, originalSlot).Empty){
                socket.emit("feature:player-log", socket.id, "Er staat al een item op dit slot!", "error", "Item on this slot!");   
            }else{
                var data = {
                    Type: "move-inventory",
                    ItemstackSlot: originalSlot,
                    DestinationSlot: draggingItem.Slot
                }
                socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "inventory", data);
            }
            setDraggingItem(undefined)
            setOriginalSlot(undefined);
            dragElement.classList.remove('dragging');
        }  
    }
    function getItemFromSlot(list: any[], slot: number){
        var itemFound: any;
        list.forEach((item: any) => {
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
                            Type={"player-inventory"}
                            Slot={item.Slot}
                            Itemstack={sendItem} 
                            InventoryAction={props.inventoryAction} 
                            ItemStartDragging={handleItemStartDragging}
                            ItemDragDrop={handleItemDragDrop}
                            ItemDragEnter={handleDragEnter}
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
                        Type={"player-inventory"}
                        Slot={item.Slot}
                        Itemstack={rawItem} 
                        InventoryAction={props.inventoryAction} 
                        ItemStartDragging={handleItemStartDragging}
                        ItemDragDrop={handleItemDragDrop}
                        ItemDragEnter={handleDragEnter}
                    />
                })}
            </div>
        </div>
    );
}
export default PlayerInventoryPane; 