import { useEffect, useState } from "react";
import IItem from "../../../../../../interfaces/IItemstack";
import IPlayer from "../../../../../../interfaces/IPlayer";
import IServer from "../../../../../../interfaces/IServer";
import JSONitem from "../../../../../../interfaces/JSONitem";
import { socket } from "../../../../../../socket/socket";
import "./EnderchestPaneStyle.scss";
import Item from "./Item";

function EnderchestPane(props: {
  player: IPlayer;
  server: IServer;
  itemList: Map<string, JSONitem>;
  inventoryAction: Function;
}) {
  const [enderchestItems, setEnderchestItems] = useState<IItem[]>([]);
  useEffect(() => {
    function loadInventories() {
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player.uuid,
        "inventory",
        { Type: "get-enderchest" }
      );
    }
    function updatePlayerEnderchest() {
      socket.on(
        `player:get-enderchest-${props.player.uuid}`,
        (itemList: IItem[]) => {
          var items: IItem[] = [];
          itemList.forEach((item: any) => {
            if (item.data.id !== "minecraft.air") {
              try {
                item.json = JSON.parse(item.json);
                item.texture = props.itemList.get(
                  `minecraft:${item.json.type.toLowerCase()}`
                );
              } catch {}
            }
            items.push(item);
          });
          setEnderchestItems(items);
        }
      );
    }
    loadInventories();
    updatePlayerEnderchest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [draggingItem, setDraggingItem] = useState<any>();
  const [dragElement, setDragElement] = useState<any>();
  const [originalSlot, setOriginalSlot] = useState<number>();

  function handleItemStartDragging(e: any, item: any) {
    setDraggingItem(item);
    setOriginalSlot(item.Slot);
    setDragElement(e.currentTarget);
    e.currentTarget.classList.add("dragging");
  }
  function handleDragEnter(empty: boolean, slot: number) {
    if (empty && slot !== undefined) {
      moveItem(draggingItem, slot);
    }
  }

  function moveItem(itemstack: any, slot: number) {
    var newInventory: any[] = enderchestItems;

    var moveToSlot: any = getItemFromSlot(newInventory, slot);
    var currentSlot: any = getItemFromSlot(newInventory, itemstack.Slot);

    if (moveToSlot.Empty) {
      var moveSlotIndex: number = newInventory.indexOf(moveToSlot);
      var itemstackIndex: number = newInventory.indexOf(currentSlot);

      itemstack.Slot = slot;

      moveToSlot.ItemstackJson = itemstack;
      delete currentSlot.ItemstackJson;
      currentSlot.Empty = true;
      moveToSlot.Empty = false;

      newInventory[moveSlotIndex] = moveToSlot;
      newInventory[itemstackIndex] = currentSlot;

      var bugVar = newInventory.slice();
      setEnderchestItems(bugVar);
    }
  }
  function handleItemDragDrop() {
    if (originalSlot !== undefined) {
      if (!getItemFromSlot(enderchestItems, originalSlot).Empty) {
        socket.emit(
          "feature:player-log",
          socket.id,
          "Er staat al een item op dit slot!",
          "error",
          "Item on this slot!"
        );
      } else {
        var data = {
          Type: "move-enderchest",
          ItemstackSlot: originalSlot,
          DestinationSlot: draggingItem.Slot,
        };
        socket.emit(
          "feature:player",
          socket.id,
          props.server.id,
          props.player.uuid,
          "inventory",
          data
        );
      }
      setDraggingItem(undefined);
      setOriginalSlot(undefined);
      dragElement.classList.remove("dragging");
    }
  }
  function getItemFromSlot(list: any[], slot: number) {
    var itemFound: any;
    list.forEach((item: any) => {
      if (item.Slot === slot) itemFound = item;
    });
    return itemFound;
  }
  return (
    <div className="inventory-panel">
      <div className="inventory-panel-items">
        {enderchestItems.map((item: any, index: number) => {
          if (item.empty) {
            return (
              <Item
                key={index}
                type={"enderchest"}
                slot={item.Slot}
                item={item}
                InventoryAction={props.inventoryAction}
                ItemStartDragging={handleItemStartDragging}
                ItemDragDrop={handleItemDragDrop}
                ItemDragEnter={handleDragEnter}
              />
            );
          }
          let rawItem: IItem = item.ItemstackJson;
          rawItem.empty = item.Empty;
          rawItem.slot = item.Slot;
          props.itemList.forEach((listitem: any) => {
            if (
              listitem.data.id ===
              "minecraft:" + rawItem.type.toString().toLowerCase()
            )
              rawItem.data.texture = listitem.data.texture;
          });
          return (
            <Item
              key={index}
              type={"enderchest"}
              slot={item.slot}
              item={rawItem}
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
export default EnderchestPane;
