import './EnderchestPaneStyle.scss';
import EnderItem from "./EnderItem";

function EnderchestPane(props: {items: any[], itemList: any[], inventoryAction: any;}){
    return (
        <div className='inventory-panel'>
            <div className="inventory-panel-items">
                {props.items.map((item: any, index: number) => {
                    var sendItem = item.ItemstackJson;
                    props.itemList.forEach((listitem:any) => {
                        if (!item.Empty){
                            if (listitem.id === "minecraft:" + sendItem.type.toString().toLowerCase()){
                                sendItem.texture = listitem.texture;
                                sendItem.Slot = item.Slot;
                            }
                        }     
                    })
                    return <EnderItem key={index} itemstack={sendItem} inventoryAction={props.inventoryAction} />
                })}
            </div>
        </div>
    );
}
export default EnderchestPane; 