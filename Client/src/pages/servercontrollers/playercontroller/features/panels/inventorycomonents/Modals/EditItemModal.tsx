import './EditModalStyle.scss';

import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Select, Tooltip } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

function EditItemModal(props: {item: any, onCancel: any, onAccept: any}){
    const [lore, setLore] = useState<string | null>(null);
    const [lores, setLores] = useState<any>([]);
    const [selectedLores, setSelectedLores] = useState<string[]>([]);
    const [itemstack, setItemstack] = useState<any>(JSON.parse(props.item.Itemstack));
    const [displayname, setDisplayname] = useState<any | null>(null);

    useEffect(function loadInputData() {
        if (itemstack.itemmeta !== undefined){
            if (itemstack.itemmeta.lore !== undefined){
                setLores(itemstack.itemmeta.lore);
            }
            if (itemstack.itemmeta.displayname !== undefined){
                setDisplayname(itemstack.itemmeta.displayname);
            }
        }
    }, [props.item])
    function handleDisplaynameChange(e: any){
        setDisplayname(e.target.value)
    }
    const handleChangeLoreSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setSelectedLores(value);
    };
    function handleLoreChange(e: any){
        setLore(e.target.value)
    }
    function handleAddLore(){
        setLores((lores: any) => [...lores, lore]);
        setLore("");
    }
    function handleRemoveLore(){
        var newLoreList: string[] = [];
        lores.map((line: string, index: number) => {
            var add = true;
            selectedLores.map((selected: string) => {
                var splitted = selected.split("_");
                var value = splitted[0];
                var valueIndex = splitted[1];
                if (value === line && valueIndex === index.toString()){
                    add = false;
                }
            })
            if (add){
                newLoreList.push(line);
            }   
        });
        setSelectedLores([]);
        setLores(newLoreList);
    }
    function handleEditClick(){
        var editedItemstack = itemstack;
        if(editedItemstack.itemmeta.displayname !== null){
            editedItemstack.itemmeta.displayname = displayname;
        }
        if(editedItemstack.itemmeta.lore !== null){
            editedItemstack.itemmeta.lore = lores;
        }
        editedItemstack.id = props.item.id;
        props.onAccept(editedItemstack);
    }
    return (
        <div className="editmodal-container">
            <div className='editmodal-backdrop' onClick={() => props.onCancel()}></div>
            <div className='editmodal-menu'>
                <div className='editmodal-menu-title'>Item Aanpassen - {itemstack.itemmeta === undefined || itemstack.itemmeta.displayname === undefined ? itemstack.type : itemstack.itemmeta.displayname}</div>
                <FormControl>
                    <label className='editmodal-menu-kop'>Displayname:</label>
                    <input type="text" value={displayname !== null && displayname} onChange={handleDisplaynameChange} id="lname" name="lastname" placeholder="Geef de displayname..." />
                    <label className='editmodal-menu-kop'>Lore:</label>
                    <input value={lore != null ? lore : ""} onChange={handleLoreChange} type="text" id="lname" name="lastname" placeholder="Geef een lore lijn in..." />
                    <div className='editmodal-menu-lore-options'>
                        <Tooltip title={"Geef bovenaan in welke lore je wenst toe te voegen"}>
                            <Button onClick={handleAddLore} variant="contained" startIcon={<AddIcon />}>
                                Toevoegen
                            </Button>
                        </Tooltip>
                        <Tooltip title={"Selecteer onderaan welke lore je wenst te verwijderen"}>
                            <Button onClick={handleRemoveLore} variant="contained" startIcon={<DeleteIcon />}>
                                Verwijderen
                            </Button>
                        </Tooltip>
                    </div>
                    <Select sx={{ margin: "5px 0"}}
                        multiple
                        native
                        value={selectedLores}
                        // @ts-ignore Typings are not considering `native`
                        onChange={handleChangeLoreSelection}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                        >
                        {lores.map((line: any, index: number) => (
                            <option key={index} value={line + "_" + index}>
                                {line}
                            </option>
                        ))}
                    </Select>
                    <Button 
                        onClick={handleEditClick} 
                        variant="contained" 
                        startIcon={<EditIcon />}
                        sx={{
                            marginTop: '10px'
                        }}>
                            Bewerken
                        </Button>
                </FormControl>
            </div>
        </div>
    );
}
export default EditItemModal;