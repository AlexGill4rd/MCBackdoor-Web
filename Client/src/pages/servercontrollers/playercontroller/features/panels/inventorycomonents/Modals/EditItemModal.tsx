import './EditModalStyle.scss';

import { useState } from 'react';
import { Button, FormControl, InputLabel, Select } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function EditItemModal(props: {onCancel: any}){
    const [lore, setLore] = useState<string | null>(null);
    const [lores, setLores] = useState<any>([]);
    const [selectedLores, setSelectedLores] = useState<string[]>([]);

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
    return (
        <div className="editmodal-container">
            <div className='editmodal-backdrop' onClick={() => props.onCancel()}></div>
            <div className='editmodal-menu'>
                <div className='editmodal-menu-title'>Item Aanpassen</div>
                <FormControl>
                    <label className='editmodal-menu-kop'>Displayname:</label>
                    <input type="text" id="lname" name="lastname" placeholder="Geef de displayname..." />
                    <label className='editmodal-menu-kop'>Lore:</label>
                    <input value={lore != null ? lore : ""} onChange={handleLoreChange} type="text" id="lname" name="lastname" placeholder="Geef een lore lijn in..." />
                    <div className='editmodal-menu-lore-options'>
                        <Button onClick={handleAddLore} variant="contained" startIcon={<AddIcon />}>
                            Toevoegen
                        </Button>
                        <Button onClick={handleRemoveLore} variant="contained" startIcon={<DeleteIcon />}>
                            Verwijderen
                        </Button>
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
                </FormControl>
            </div>
        </div>
    );
}
export default EditItemModal;