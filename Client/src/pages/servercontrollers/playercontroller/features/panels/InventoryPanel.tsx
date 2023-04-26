import { CircularProgress, Tooltip } from "@mui/material";

import "./PanelStyle.scss";
import "./InventoryPanelStyle.scss";

import { useState } from "react";
import PlayerInventoryPanel from "./inventorycomonents/PlayerInventoryPanel";
import SavedItemsPane from "./inventorycomonents/SavedItemsPane";
import EnderchestPanel from "./inventorycomonents/EnderchestPanel";

import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function InventoryPanel(props: { server: IServer; player: IPlayer | null }) {
  const [inventoryType, setInventoryType] = useState<string | null>(null);

  //Change the inventory that is being shown
  const handleInventoryChange = (type: string) => {
    setInventoryType(type);
  };

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
        {inventoryType === "default" && (
          <PlayerInventoryPanel server={props.server} player={props.player} />
        )}
        {inventoryType === "enderchest" && (
          <EnderchestPanel server={props.server} player={props.player} />
        )}
        {inventoryType === "saved" && <SavedItemsPane player={props.player} />}
      </div>
    </>
  );
}
export default InventoryPanel;
