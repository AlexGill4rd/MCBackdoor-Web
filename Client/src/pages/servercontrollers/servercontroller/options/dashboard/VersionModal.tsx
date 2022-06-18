import './VersionModalStyle.scss';
import { Button, Input } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


function VersionModal(props: {onCancel: any, onAccept: any;}){
    const [file, setFile] = useState<any>(null);

    function handleFileSelect(e: any){
        setFile(e.target.files[0])
    }
    return (
        <div className='versionmodal'>
            <div className='versionmodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='versionmodal-menu'>
                <div className='versionmodal-menu-title'>Command/Message:</div>
                <Input 
                    type="file" 
                    onChange={handleFileSelect} 
                    id="contained-button-file" 
                    sx={{
                        width: "100%",
                    }}  
                />
       
                <Button 
                    onClick={() => props.onAccept(file)} 
                    variant="contained" 
                    startIcon={<SearchIcon />}
                    sx={{
                        marginTop: '10px'
                    }}
                >
                    Versie aanpassen
                </Button>
            </div>
        </div>
    );
}
export default VersionModal;