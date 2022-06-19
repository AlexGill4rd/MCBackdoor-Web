import './IconModalStyle.scss';
import { Button, Input, Tooltip } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


function IconModal(props: {onCancel: any, onAccept: any;}){
    const [url, setURL] = useState<any>("");

    function handelFileURLChange(e: any){
        setURL(e.target.value)
    }
    return (
        <div className='iconmodal'>
            <div className='iconmodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='iconmodal-menu'>
                <div className='iconmodal-menu-title'>Geef het icoon adres:</div>
                <input type="text" onChange={handelFileURLChange} placeholder="Geef de url in..." value={url} />
                <Tooltip title={<div className='iconmodal-menu-help'><div>Kopieer de downloadknop link address</div><div>Bijvoorbeeld: https://download1476.mediafire.com/zhyhksus7xdg/8clklf2rodfxtgt/Afbeelding.png</div></div>} disableInteractive placement='top'>
                    <a target="_blank" href="https://app.mediafire.com/myfiles">Upload file op mediafire</a>
                </Tooltip>
                <div className='iconmodal-menu-description'>De afbeelding moet 64x64 zijn!</div>
                <Tooltip title={"Het icoon zal aangepast worden bij een restart"} disableInteractive placement='top'>
                    <Button 
                        onClick={() => props.onAccept(url)} 
                        variant="contained" 
                        startIcon={<SearchIcon />}
                        sx={{
                            marginTop: '10px'
                        }}
                    >
                        Verander server icoon
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}
export default IconModal;