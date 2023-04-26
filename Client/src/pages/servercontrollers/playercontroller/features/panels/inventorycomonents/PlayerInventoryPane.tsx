import { useEffect, useState } from "react";
import IItem from "../../../../../../interfaces/IItemstack";
import IPlayer from "../../../../../../interfaces/IPlayer";
import IServer from "../../../../../../interfaces/IServer";
import JSONitem from "../../../../../../interfaces/JSONitem";
import { socket } from "../../../../../../socket/socket";
import InventorySlot from "./InventorySlot";
import inventoryTextures from "../InventoryTextures.json";

import "./PlayerInventoryPaneStyle.scss";
import ISlot from "../../../../../../interfaces/ISlot";

function PlayerInventoryPane(props: { player: IPlayer; server: IServer }) {
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
        { action: "get_inventory" }
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
  const [dragToSlot, setDragToSlot] = useState<ISlot | undefined>(undefined);
  const [dragElement, setDragElement] = useState<Element>();
  const [originalSlot, setOriginalSlot] = useState<ISlot | undefined>(
    undefined
  );

  const handleItemStartDragging = (e: any, slot: ISlot) => {
    setOriginalSlot(slot);
    setDragElement(e.currentTarget);
    e.currentTarget.classList.add("dragging");
  };
  const handleDragEnter = (slot: ISlot) => {
    if (!slot.empty || slot === undefined || originalSlot === undefined) return;

    setDragToSlot(slot);
    moveItem(originalSlot, slot);
  };

  const moveItem = (from_slot: ISlot, to_slot: ISlot) => {
    let newSlots: ISlot[] = inventorySlots;

    const from_slot_index = inventorySlots.indexOf(from_slot);
    const to_slot_index = inventorySlots.indexOf(to_slot);

    swapElements(newSlots, from_slot_index, to_slot_index);

    setInventorySlots(newSlots);
  };
  const swapElements = (array: any[], index1: any, index2: any) => {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  };
  const handleItemDragDrop = () => {
    if (
      originalSlot === undefined ||
      originalSlot.empty ||
      dragToSlot === undefined ||
      dragElement === undefined
    )
      return;

    var data = {
      type: "move-inventory",
      from_slot: originalSlot,
      to_slot: dragToSlot.value,
    };
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player.uuid,
      "inventory",
      data
    );

    setDragToSlot(undefined);
    setOriginalSlot(undefined);
    dragElement.classList.remove("dragging");
  };
  return (
    <div className="inventory-panel">
      <div className="inventory-panel-items">
        {inventorySlots.map((slot: ISlot, index: number) => {
          return (
            <InventorySlot
              key={slot.value}
              type={"player-inventory"}
              slot={slot}
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
