import './GameruleModalStyle.scss';
import { Button, Checkbox, FormControlLabel, Tooltip } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';


function GameruleModal(props: {Gamerule: any, onCancel: any, onAccept: any;}){
    const [gamerule] = useState<any>(props.Gamerule.Gamerule);
    const [value, setValue] = useState<any>(props.Gamerule.Value);
    const [valueType, setValueType] = useState<string>("string");

    function handleValueChange(e: any){
        if (valueType === "number"){
            setValue(e.target.value)
        }else if (valueType === "boolean"){
            setValue(e.target.checked)
        }
    }
    useEffect(() => {
        if (props.Gamerule.Value === true || props.Gamerule.Value === false)
            setValueType("boolean")
        else if (Number.isInteger(props.Gamerule.Value))
            setValueType("number")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='gamerulemodal'>
            <div className='gamerulemodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='gamerulemodal-menu'>
                <div className='gamerulemodal-menu-title'>Gamerule aanpassen</div>
                <div className='gamerulemodal-menu-info'>Selected: {gamerule}</div>
                <div className='gamerulemodal-menu-info'>Previous Value: {props.Gamerule.Value.toString()}</div>
                {valueType === "string" && <input type="text" onChange={handleValueChange} placeholder="Geef de nieuwe waarde van de gamerule in..." value={value} />}
                {valueType === "boolean" && <FormControlLabel onChange={handleValueChange} control={<Checkbox checked={value} />} label="Gamerule State" />}
                {valueType === "number" && <input type="number" onChange={handleValueChange} placeholder="Geef de nieuwe waarde van de gamerule in..." value={value} />}
                

                <Tooltip title={"De gamerule zal aangepast worden bij bevestiging"} disableInteractive placement='top'>
                    <Button 
                        onClick={() => props.onAccept(gamerule, value, props.Gamerule.World)} 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        sx={{
                            marginTop: '10px'
                        }}
                    >
                        Pas gamerule aan
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}
export default GameruleModal;