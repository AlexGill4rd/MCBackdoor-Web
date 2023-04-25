import { CircularProgress, Tooltip } from "@mui/material";

import "./PanelStyle.scss";
import "./InventoryPanelStyle.scss";

import { useEffect, useState } from "react";
import { socket } from "../../../../../socket/socket";
import PlayerInventoryPane from "./inventorycomonents/PlayerInventoryPane";
import SavedItemsPane from "./inventorycomonents/SavedItemsPane";
import EnderchestPane from "./inventorycomonents/EnderchestPane";

import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";
import IItemstack from "../../../../../interfaces/IItemstack";
import { InventoryAction } from "./inventorycomonents/enums/inventoryaction";

function InventoryPanel(props: { server: IServer; player: IPlayer | null }) {
  const [inventoryType, setInventoryType] = useState<string | null>(null);

  //Change the inventory that is being shown
  const handleInventoryChange = (type: string) => {
    setInventoryType(type);
  };

  //Actions performed when right clicking on item
  const inventoryAction = (action: InventoryAction, itemstack: IItemstack) => {
    switch (action) {
      case InventoryAction.save_item: {
        const saveItem = {
          server_id: props.server.id,
          itemstack: itemstack,
          player_uuid: props.player?.uuid,
        };
        socket.emit("saveditem:new", saveItem);
        socket.emit("feature:player-log", socket.id, {
          title: "Inventory Saved",
          message: "Item successfully saved in storage!",
          severity: "success",
        });
        break;
      }
      default: {
        const packet = {
          action: action,
          slot: itemstack.slot,
          item: itemstack,
        };
        socket.emit(
          "feature:player",
          socket.id,
          props.server.id,
          props.player?.uuid,
          "inventory",
          packet
        );
      }
    }
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Inventory Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="inventorypanel-container">
        <div className="inventorypanel-selection">
          <Tooltip
            title="Open de inventaris van de speler"
            onClick={() => handleInventoryChange("default")}
          >
            <div className="inventorypanel-selection-button">
              Default Inventory
            </div>
          </Tooltip>
          <Tooltip
            title="Open de inventaris van de speler"
            onClick={() => handleInventoryChange("enderchest")}
          >
            <div className="inventorypanel-selection-button">
              Ender Chest Inventory
            </div>
          </Tooltip>
          <Tooltip
            title="Bekijk de opgeslagen items"
            onClick={() => handleInventoryChange("saved")}
          >
            <div className="inventorypanel-selection-button">
              Opgeslagen Items
            </div>
          </Tooltip>
        </div>
        {inventoryType === "default" &&
          <PlayerInventoryPane
            player={props.player}
            server={props.server}
            inventoryAction={inventoryAction}
          />
        )}
        {inventoryType === "enderchest" ? (
          <EnderchestPane
            player={props.player}
            server={props.server}
            itemList={items}
            inventoryAction={inventoryAction}
          />
        ) : (
          <></>
        )}
        {inventoryType === "saved" ? (
          <SavedItemsPane player={props.player} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default InventoryPanel;
