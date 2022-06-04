import Item from "./Item";

import './PlayerInventoryPaneStyle.scss';

function PlayerInventoryPane(props: {items: any[], itemList: any[], inventoryAction: any;}){
    return (
        <div className='inventory-panel'>
            {props.items.map((item: any, index: number) => {
                var sendItem = item;
                props.itemList.map((listitem:any) => {
                    if (item.id !== "none"){
                        if (listitem.id === "minecraft:" + item.id){
                            sendItem.id = listitem.id;
                            sendItem.texture = listitem.texture;
                        }
                    }     
                })
                return <Item key={index} itemstack={sendItem} inventoryAction={props.inventoryAction} />
            })}
        </div>
    );
}
export default PlayerInventoryPane; 