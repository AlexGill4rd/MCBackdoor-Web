import './VersionModalStyle.scss';
import { Button, Tooltip } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


function VersionModal(props: {onCancel: any, onAccept: any;}){
    const [url, setURL] = useState<any>("");

    function handelFileURLChange(e: any){
        setURL(e.target.value)
    }
    return (
        <div className='versionmodal'>
            <div className='versionmodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='versionmodal-menu'>
                <div className='versionmodal-menu-title'>Geef de URL:</div>
                <input type="text" onChange={handelFileURLChange} placeholder="Geef de url in..." value={url} />
                <Tooltip title={<div className='versionmodal-menu-help'><div>Kopieer de downloadknop link address</div><div>Bijvoorbeeld: https://download1476.mediafire.com/zhyhksus7xdg/8clklf2rodfxtgt/spigot-1.18.2.jar</div></div>} disableInteractive placement='top'>
                    <a target="_blank" rel="noreferrer" href="https://app.mediafire.com/myfiles">Upload file op mediafire</a>
                </Tooltip>
                <Button 
                    onClick={() => props.onAccept(url)} 
                    variant="contained" 
                    startIcon={<SearchIcon />}
                    sx={{
                        marginTop: '10px'
                    }}
                >
                    Start version download
                </Button>
            </div>
        </div>
    );
}
export default VersionModal;