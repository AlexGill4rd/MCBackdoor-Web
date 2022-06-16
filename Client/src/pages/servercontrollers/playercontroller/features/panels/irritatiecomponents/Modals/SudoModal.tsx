import { Button } from '@mui/material';
import { useState } from 'react';
import './SudoModalStyle.scss';

import FileUploadIcon from '@mui/icons-material/FileUpload';

function SudoModal(props: {onAccept: any, onCancel: any;}){

    const [command, setCommand] = useState<string>("");

    function handleCommandChange(e: any){
        setCommand(e.target.value);
    }
    return (
        <div className='sudomodal'>
            <div className='sudomodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='sudomodal-menu'>
                <div className='sudomodal-menu-title'>Command/Message:</div>
                <input type="text" onChange={handleCommandChange} placeholder="Geef het commando in..." value={command} />
                <Button 
                    onClick={() => props.onAccept(command)} 
                    variant="contained" 
                    startIcon={<FileUploadIcon />}
                    sx={{
                        marginTop: '10px'
                    }}
                >
                    Stel sudo commando in!
                </Button>
            </div>
        </div>
    );
}
export default SudoModal;