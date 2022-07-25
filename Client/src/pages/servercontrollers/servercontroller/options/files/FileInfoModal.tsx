import { Button } from '@mui/material';
import './FileInfoModalStyle.scss';

import CloseIcon from '@mui/icons-material/Close';

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
function niceBytes(x: any){
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

function FileInfoModal(props: {File: any, onCancel: any}) {
    var CreateDate = new Date(props.File.CreateDate);
    var AccessTime = new Date(props.File.AccessTime);
    var ModifiedDate = new Date(props.File.ModifiedDate);
    var fileSize = niceBytes(props.File.Size);
    return (
        <div className='infomodal'>
            <div className='infomodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='infomodal-menu'>
                <div className='infomodal-menu-title'>File information</div>
                <span><strong>Bestandsnaam:</strong> {props.File.Name}</span>
                {props.File.Extension === "" ? <></> : <span><strong>Extensie:</strong> {props.File.Extension}</span>}
                <span><strong>Directory:</strong> {props.File.IsDirectory}</span>
                <span><strong>ParentPath:</strong> {props.File.ParentPath}</span>
                <span><strong>Path:</strong> {props.File.Path}</span>
                <span><strong>CreateDate:</strong> {CreateDate.toUTCString()}</span>
                <span><strong>AccessTime:</strong> {AccessTime.toUTCString()}</span>
                <span><strong>ModifiedDate:</strong> {ModifiedDate.toUTCString()}</span>
                <span><strong>Size:</strong> {fileSize}</span><br />
                <div className='infomodal-menu-title'>Drive information</div>
                <span><strong>Free space on drive:</strong> {(props.File.FreeSpace / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                <span><strong>Total drive space:</strong> {(props.File.TotalSpace / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                <span><strong>Gebruikte opslag:</strong> {(props.File.UsedSpace / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                <span><strong>Overzicht:</strong> {(props.File.UsedSpace / (1024 * 1024 * 1024)).toFixed(2) +" GB / " + (props.File.TotalSpace / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                <Button 
                    onClick={() => props.onCancel()} 
                    variant="contained" 
                    startIcon={<CloseIcon />}
                    sx={{marginTop: "10px"}}
                    >
                    Sluiten
                </Button>
            </div>
        </div>
    );
}
export default FileInfoModal;