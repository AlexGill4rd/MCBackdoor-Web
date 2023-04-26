import { CircularProgress, Tooltip } from "@mui/material";
import "./InventorySlotStyle.scss";

import { FaTrash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaQuidditch } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Enchanting from "./Enchanting";
import ISlot from "../../../../../../interfaces/ISlot";
import { ReactElement } from "react";
import { socket } from "../../../../../../socket/socket";
import IServer from "../../../../../../interfaces/IServer";

function InventorySlot(props: {
  server: IServer;
  type: string;
  slot: ISlot;
  ItemStartDragging: Function;
  ItemDragDrop: any;
  ItemDragEnter: Function;
}) {
  function stripColor(string: string) {
    var noColorString = "";
    for (var i = 0; i < string.length; i++) {
      if (string[i] !== "§" && string[i - 1] !== "§")
        noColorString += string[i];
    }
    return noColorString;
  }

  if (props.slot.empty || props.slot.itemstack === undefined) {
    return (
      <div
        className="slot"
        id={`slot-${props.slot.value}`}
        onDragOver={function (e: any) {
          e.preventDefault();
        }}
        onDragEnter={() => props.ItemDragEnter(props.slot)}
        onDrop={props.ItemDragDrop}
      ></div>
    );
  } else {
    let displayname: ReactElement = <></>;
    if (props.slot.itemstack.itemmeta.displayname !== undefined) {
      displayname = (
        <>
          <span style={{ color: "white" }}>Itemname: </span>
          <span style={{ color: "rgb(200, 200, 200)" }}>
            {stripColor(props.slot.itemstack.itemmeta.displayname)}
          </span>
        </>
      );
    }
    let type = (
      <>
        <span style={{ color: "white" }}>Type: </span>
        <span style={{ color: "rgb(200, 200, 200)" }}>
          {props.slot.itemstack.itemmeta.type
            .replaceAll("_", " ")
            .toString()
            .toLowerCase()}
        </span>
      </>
    );
    let lore: string[] = [];
    if (props.slot.itemstack.itemmeta.lore !== undefined)
      lore = props.slot.itemstack.itemmeta.lore;

    let tooltip = [
      <div key={0} className="slot-tooltip">
        <div className="slot-title">{displayname}</div>
        <div className="slot-type">{type}</div>
        <div className="slot-lore">
          {lore.length > 0 && <div>Lore:</div>}
          {lore.map((line: string, index: number) => {
            return (
              <div
                key={index}
                style={{ color: "rgb(200, 200, 200)" }}
                className="item-lore-line"
              >
                <span>{"- " + stripColor(line)}</span>
              </div>
            );
          })}
        </div>
      </div>,
    ];

    const handleSaveSlot = (slot: ISlot) => {
      const savePacket = {
        server_id: props.server.id,
        itemstack: slot.itemstack,
        player_uuid: props.player?.uuid,
      };
      socket.emit("saveditem:new", saveItem);
      socket.emit("feature:player-log", socket.id, {
        title: "Inventory Saved",
        message: "Item successfully saved in storage!",
        severity: "success",
      });
    };
    const inventoryAction = (action: string, slot: ISlot) => {
      const packet = {
        action: action,
        slot: slot.value,
        item: slot.itemstack,
      };
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player?.uuid,
        "inventory",
        packet
      );
    };

    return (
      <Menu
        className="slot-contextmenu"
        menuButton={
          <Tooltip placement="top" title={tooltip} disableInteractive>
            <div className="slot noselect" id={`slot-${props.slot.value}`}>
              <div
                className="item"
                draggable="true"
                onDragOver={function (e: any) {
                  e.preventDefault();
                }}
                onDragStart={(e) => props.ItemStartDragging(e, props.slot)}
                onDragEnter={() => props.ItemDragEnter(false)}
                onDrop={props.ItemDragDrop}
              >
                {props.slot.itemstack.itemmeta !== undefined &&
                props.slot.itemstack.itemmeta.enchants !== undefined ? (
                  <Enchanting />
                ) : (
                  <></>
                )}
                {props.slot.itemstack.data?.texture !== undefined ? (
                  <img
                    style={{ width: 50, height: 50 }}
                    src={props.slot.itemstack.data.texture}
                    alt="item icon"
                  />
                ) : (
                  <CircularProgress />
                )}
              </div>
              <span className="slot-amount">
                {props.slot.itemstack.itemmeta.amount}
              </span>
            </div>
          </Tooltip>
        }
      >
        <MenuHeader>Optie's</MenuHeader>
        <MenuItem
          className="slot-context-button"
          onClick={() => props.InventoryAction(removeAction, props.item)}
        >
          <FaTrash />
          <span>Remove Item</span>
        </MenuItem>
        <MenuItem
          className="slot-context-button"
          onClick={() => props.InventoryAction(duplicateAction, props.item)}
        >
          <FaCopy />
          <span>Duplicate item</span>
        </MenuItem>
        <MenuItem
          className="slot-context-button"
          onClick={() => props.InventoryAction(dropAction, props.item)}
        >
          <FaQuidditch />
          <span>Drop Item</span>
        </MenuItem>
        <MenuDivider />
        <MenuHeader>Opslaan</MenuHeader>
        <MenuItem
          className="slot-context-button"
          onClick={() => props.InventoryAction("save", props.item)}
        >
          <FaSave />
          <span>Save Item</span>
        </MenuItem>
      </Menu>
    );
  }
}
export default Item;
