import { useEffect, useState } from "react";
import IItem from "../../../../../../interfaces/IItemstack";
import IPlayer from "../../../../../../interfaces/IPlayer";
import IServer from "../../../../../../interfaces/IServer";
import JSONitem from "../../../../../../interfaces/JSONitem";
import { socket } from "../../../../../../socket/socket";
import Item from "./Item";
import inventoryTextures from "../InventoryTextures.json";

import "./PlayerInventoryPaneStyle.scss";
import { InventoryAction } from "./enums/inventoryaction";
import IItemstack from "../../../../../../interfaces/IItemstack";
import ISlot from "../../../../../../interfaces/ISlot";

function PlayerInventoryPane(props: {
  player: IPlayer;
  server: IServer;
  inventoryAction: Function;
}) {
  let items = new Map<string, JSONitem>();
  const [inventorySlots, setInventorySlots] = useState<any>([]);

  useEffect(() => {
    const loadInventory = () => {
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player.uuid,
        "inventory",
        { action: InventoryAction.get_inventory }
      );
    };
    const updatePlayerInventory = () => {
      socket.on(
        `player:get-inventory-${props.player.uuid}`,
        (itemSlots: ISlot[]) => {
          let newSlots: ISlot[] = [];
          //Fix the texture data on itemstack
          itemSlots.forEach((slot: ISlot | any) => {
            if (!slot.empty && slot.itemstack !== undefined) {
              try {
                slot.itemstack = JSON.parse(slot.itemstack);
                slot.itemstack.data = items.get(
                  `minecraft:${slot.itemstack.itemmeta.type.toLowerCase()}`
                );
              } catch {}
            }
            newSlots.push(slot);
          });
          setInventorySlots(newSlots);
        }
      );
    };
    const loadItems = () => {
      for (let item of inventoryTextures.items) items.set(item.id, item);
    };
    loadItems();
    loadInventory();
    updatePlayerInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [draggingItem, setDraggingItem] = useState<IItem | undefined>(
    undefined
  );
  const [dragElement, setDragElement] = useState<Element>();
  const [originalSlot, setOriginalSlot] = useState<number | undefined>(
    undefined
  );

  function handleItemStartDragging(e: any, item: IItem) {
    setDraggingItem(item);
    setOriginalSlot(item.slot);
    setDragElement(e.currentTarget);
    e.currentTarget.classList.add("dragging");
  }
  function handleDragEnter(empty: boolean, slot: number) {
    if (empty && slot !== undefined && draggingItem !== undefined) {
      moveItem(draggingItem, slot);
    }
  }

  const moveItem = (item: IItem, slot: number) => {
    let newInventory: any[] = inventoryItems;

    let moveToItem: IItem | undefined = getItemFromSlot(slot);

    if (moveToItem === undefined) {
      socket.emit("feature:player-log", socket.id, {
        title: "Inventory Error",
        message: "Can't move to this slot",
        severity: "error",
      });
      return;
    }
    if (!isItemAir(moveToItem)) return;

    let moveSlotIndex: number = newInventory.indexOf(moveToItem);
    let itemstackIndex: number = newInventory.indexOf(item);

    item.slot = slot;

    moveToItem = item;

    newInventory[moveSlotIndex] = moveToItem;
    newInventory[itemstackIndex] = item.slot;

    let bugVar = newInventory.slice();
    setInventoryItems(bugVar);
  };
  const isItemAir = (item: IItem) => {
    return item.data.id === "minecraft:air";
  };
  function handleItemDragDrop() {
    if (originalSlot !== undefined && inventoryItems !== undefined) {
      const originalSlotItem: IItem | undefined = getItemFromSlot(originalSlot);
      if (originalSlotItem === undefined) {
        socket.emit("feature:player-log", socket.id, {
          title: "Inventory Error",
          message: "The original slot item is air!",
          severity: "error",
        });
        return;
      }
      if (draggingItem === undefined) {
        socket.emit("feature:player-log", socket.id, {
          title: "Inventory Error",
          message: "Dragging item is undefined",
          severity: "error",
        });
        return;
      }
      if (isItemAir(originalSlotItem)) {
        socket.emit("feature:player-log", socket.id, {
          title: "Inventory Error",
          message: "There already is an item on this slot",
          severity: "error",
        });
        return;
      }
      if (dragElement === undefined) {
        socket.emit("feature:player-log", socket.id, {
          title: "Inventory Error",
          message: "Drag element is undefined",
          severity: "error",
        });
        return;
      }
      var data = {
        type: "move-inventory",
        from_slot: originalSlot,
        to_slot: draggingItem.slot,
      };
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player.uuid,
        "inventory",
        data
      );

      setDraggingItem(undefined);
      setOriginalSlot(undefined);
      dragElement.classList.remove("dragging");
    }
  }
  const getItemFromSlot = (slot: number) => {
    let itemFound: IItem | undefined = undefined;
    inventoryItems.forEach((item: IItem) => {
      if (item.slot === slot) itemFound = item;
    });
    return itemFound;
  };
  return (
    <div className="inventory-panel">
      <div className="inventory-panel-items">
        {inventoryItems.map((item: IItem, index: number) => {
          if (item.empty) {
            return (
              <Item
                key={index}
                type={"player-inventory"}
                slot={item.slot}
                item={item}
                InventoryAction={props.inventoryAction}
                ItemStartDragging={handleItemStartDragging}
                ItemDragDrop={handleItemDragDrop}
                ItemDragEnter={handleDragEnter}
              />
            );
          }
          return (
            <Item
              key={index}
              type={"player-inventory"}
              slot={item.slot}
              item={item}
              InventoryAction={props.inventoryAction}
              ItemStartDragging={handleItemStartDragging}
              ItemDragDrop={handleItemDragDrop}
              ItemDragEnter={handleDragEnter}
            />
          );
        })}
      </div>
    </div>
  );
}
export default PlayerInventoryPane;
