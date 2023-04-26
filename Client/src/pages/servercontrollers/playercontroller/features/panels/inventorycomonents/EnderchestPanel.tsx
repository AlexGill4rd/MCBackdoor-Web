import { useEffect, useState } from "react";
import IPlayer from "../../../../../../interfaces/IPlayer";
import IServer from "../../../../../../interfaces/IServer";
import ISlot from "../../../../../../interfaces/ISlot";
import JSONitem from "../../../../../../interfaces/JSONitem";
import { socket } from "../../../../../../socket/socket";
import "./EnderchestPanelStyle.scss";
import inventoryTextures from "../InventoryTextures.json";
import InventorySlot from "./InventorySlot";

export default function EnderchestPanel(props: {
  player: IPlayer;
  server: IServer;
}) {
  let items = new Map<string, JSONitem>();

  const [inventorySlots, setInventorySlots] = useState<any>([]);

  useEffect(() => {
    function loadInventory() {
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player.uuid,
        "inventory",
        { Type: "get-enderchest" }
      );
    }
    const updateEnderchest = () => {
      socket.on(
        `player:get-enderchest-${props.player.uuid}`,
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
    updateEnderchest();
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

    swapElements(from_slot, to_slot);

    setInventorySlots(newSlots);
  };
  const swapElements = (from_slot: ISlot, to_slot: ISlot) => {
    const copy_from_itemstack = JSON.parse(JSON.stringify(from_slot.itemstack));

    if (to_slot.empty) {
      from_slot.empty = true;
      delete from_slot.itemstack;
    } else {
      from_slot.itemstack = to_slot.itemstack;
      from_slot.empty = false;
    }

    to_slot.itemstack = copy_from_itemstack;
    to_slot.empty = false;
  };
  const handleDragLeave = () => {
    if (originalSlot === undefined || dragToSlot === undefined) return;
    swapElements(originalSlot, dragToSlot);
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
      action: "move-enderchest",
      from_slot: originalSlot.value,
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
        {inventorySlots.map((slot: ISlot) => {
          return (
            <InventorySlot
              key={slot.value}
              type={"enderchest"}
              player={props.player}
              slot={slot}
              ItemStartDragging={handleItemStartDragging}
              ItemDragDrop={handleItemDragDrop}
              ItemDragEnter={handleDragEnter}
              ItemDragLeave={handleDragLeave}
            />
          );
        })}
      </div>
    </div>
  );
}
