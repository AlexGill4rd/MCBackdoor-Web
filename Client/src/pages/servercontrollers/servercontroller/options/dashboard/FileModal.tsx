import './FileModalStyle.scss';
import { Button, Tooltip } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';


function FileModal(props: {onCancel: any, onAccept: any;}){
    const [url, setURL] = useState<any>("");

    function handelFileURLChange(e: any){
        setURL(e.target.value)
    }
    return (
        <div className='filemodal'>
            <div className='filemodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='filemodal-menu'>
                <div className='filemodal-menu-title'>File download adres:</div>
                <input type="text" onChange={handelFileURLChange} placeholder="Geef de url in..." value={url} />
                <Tooltip title={<div className='filemodal-menu-help'><div>Kopieer het downloadknop link address</div><div>Bijvoorbeeld: https://download1476.mediafire.com/zhyhksus7xdg/8clklf2rodfxtgt/File.jar</div></div>} disableInteractive placement='top'>
                    <a target="_blank" href="https://app.mediafire.com/myfiles">Upload file op mediafire</a>
                </Tooltip>
                <div className='filemodal-menu-description'>Geen folders!</div>
                <Tooltip title={"De file zal uitgevoert worden bij een restart of reload"} disableInteractive placement='top'>
                    <Button 
                        onClick={() => props.onAccept(url)} 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        sx={{
                            marginTop: '10px'
                        }}
                    >
                        Voeg file toe
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}
export default FileModal;