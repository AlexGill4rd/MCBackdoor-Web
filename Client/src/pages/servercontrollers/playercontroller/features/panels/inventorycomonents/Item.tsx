import { CircularProgress, Tooltip } from "@mui/material";
import "./ItemStyle.scss";

import { FaTrash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaQuidditch } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

import { Menu, MenuItem, MenuDivider, MenuHeader } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import Enchanting from "./Enchanting";
import IItem from "../../../../../../interfaces/IItemstack";

function Item(props: {
  type: string;
  item: IItem;
  slot: number;
  InventoryAction: Function;
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
  if (props.item.empty) {
    return (
      <div
        className="slot"
        id={props.item.slot.toString()}
        onDragOver={function (e: any) {
          e.preventDefault();
        }}
        onDragEnter={() => props.ItemDragEnter(true, props.slot)}
        onDrop={props.ItemDragDrop}
      ></div>
    );
  } else {
    let displayname: any;
    if (props.item.itemmeta !== undefined) {
      if (props.item.itemmeta.displayname !== undefined) {
        displayname = (
          <>
            <span style={{ color: "white" }}>Itemname: </span>
            <span style={{ color: "rgb(200, 200, 200)" }}>
              {stripColor(props.item.itemmeta.displayname)}
            </span>
          </>
        );
      }
    }
    let type = (
      <>
        <span style={{ color: "white" }}>Type: </span>
        <span style={{ color: "rgb(200, 200, 200)" }}>
          {props.item.type.replaceAll("_", " ").toString().toLowerCase()}
        </span>
      </>
    );
    let lore: string[] = [];
    if (
      props.item.itemmeta !== undefined &&
      props.item.itemmeta.lore !== undefined
    ) {
      lore = props.item.itemmeta.lore;
    }
    let tooltip = [
      <div key={0} className="slot-tooltip">
        <div className="slot-title">{displayname !== "" && displayname}</div>
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
    var removeAction = props.type === "enderchest" ? "ender-remove" : "remove";
    var duplicateAction =
      props.type === "enderchest" ? "ender-duplicate" : "duplicate";
    var dropAction = props.type === "enderchest" ? "ender-drop" : "drop";
    return (
      <Menu
        className="slot-contextmenu"
        menuButton={
          <Tooltip placement="top" title={tooltip} disableInteractive>
            <div className="slot noselect" id={props.item.slot.toString()}>
              <div
                className="item"
                draggable="true"
                onDragOver={function (e: any) {
                  e.preventDefault();
                }}
                onDragStart={(e) => props.ItemStartDragging(e, props.item)}
                onDragEnter={() => props.ItemDragEnter(false)}
                onDrop={props.ItemDragDrop}
              >
                {props.item.itemmeta !== undefined &&
                props.item.itemmeta.enchantments !== undefined ? (
                  <Enchanting />
                ) : (
                  <></>
                )}
                {props.item.data.texture !== undefined ? (
                  <img
                    style={{ width: 50, height: 50 }}
                    src={props.item.data.texture}
                    alt="item icon"
                  />
                ) : (
                  <CircularProgress />
                )}
              </div>
              <span className="slot-amount">{props.item.amount}</span>
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
