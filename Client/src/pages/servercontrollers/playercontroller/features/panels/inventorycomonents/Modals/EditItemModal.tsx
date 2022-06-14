import './EditModalStyle.scss';

import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Select, Tooltip } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Enchantment from './Components/Enchantment';

function EditItemModal(props: {item: any, onCancel: any, onAccept: any}){
    const [lore, setLore] = useState<string | null>(null);
    const [lores, setLores] = useState<any>([]);
    const [selectedLores, setSelectedLores] = useState<string[]>([]);
    const [itemstack, setItemstack] = useState<any>(JSON.parse(props.item.Itemstack));
    const [displayname, setDisplayname] = useState<any | null>(null);

    const enchantments = ["PROTECTION_FIRE","DAMAGE_ALL","ARROW_FIRE","SOUL_SPEED","WATER_WORKER","ARROW_KNOCKBACK","LOYALTY","DEPTH_STRIDER","VANISHING_CURSE","DURABILITY","KNOCKBACK","LUCK","BINDING_CURSE","LOOT_BONUS_BLOCKS","PROTECTION_ENVIRONMENTAL","DIG_SPEED","MENDING","FROST_WALKER","LURE","LOOT_BONUS_MOBS","PIERCING","PROTECTION_EXPLOSIONS","DAMAGE_UNDEAD","MULTISHOT","FIRE_ASPECT","CHANNELING","SWEEPING_EDGE","THORNS","DAMAGE_ARTHROPODS","OXYGEN","RIPTIDE","SILK_TOUCH","QUICK_CHARGE","PROTECTION_PROJECTILE","IMPALING","PROTECTION_FALL","ARROW_DAMAGE","ARROW_INFINITE"];
    const [shownEnchants, setShownEnchant] = useState<any[]>([]);

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
    const [searchTerm, setSearchTerm] = useState<any>("");
    function handleSearchChange(e: any) {
        setSearchTerm(e.target.value)
    }
    useEffect(() => {
        updateEnchants();
    }, [searchTerm]);
    function updateEnchants(){
        setShownEnchant([]);
        enchantments.map((enchant: string) => {
            if (searchTerm === "" || enchant.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())){
                setShownEnchant((shownEnchants: any) => [...shownEnchants, enchant]);
            }
        })
    }
    return (
        <div className="editmodal-container">
            <div className='editmodal-backdrop' onClick={() => props.onCancel()}></div>
            <div className='editmodal-menu'>
                <div className='editmodal-menu-title'>Item Aanpassen - {itemstack.itemmeta === undefined || itemstack.itemmeta.displayname === undefined ? itemstack.type : itemstack.itemmeta.displayname}</div>
                <FormControl>
                    <label className='editmodal-menu-kop'>Displayname:</label>
                    <input type="text" value={displayname !== null ? displayname: ""} onChange={handleDisplaynameChange} id="lname" name="lastname" placeholder="Geef de displayname..." />
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
                    <label className='editmodal-menu-kop'>Enchanting:</label>
                    <input type="text" onChange={handleSearchChange} value={searchTerm} id="lsearch" name="search" placeholder="Zoek naar een enchant..." />
                    <div className='editmodal-menu-enchanting'>
                        <div className='editmodal-menu-enchanting-list'>
                            <div className='editmodal-menu-enchanting-list-items'>
                                {shownEnchants.map((ench: string, index: number) => {
                                    return <Enchantment key={index} Name={ench} />
                                })}
                            </div>
                        </div>
                        <div className='editmodal-menu-enchanting-active'>

                        </div>
                    </div>
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