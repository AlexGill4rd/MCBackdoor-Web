import { Button } from '@mui/material';
import './InfoBannedModalStyle.scss';

import CloseIcon from '@mui/icons-material/Close';

function InfoBannedModal(props: {Player: any, onCancel: any}) {
    return (
        <div className='infomodal'>
            <div className='infomodal-backdrop' onClick={() => props.onCancel()}></div>
            <div className='infomodal-menu'>
                <div className='infomodal-menu-title'>Speler information</div>
                <span><strong>Displayname:</strong> {props.Player.Displayname}</span>
                <span><strong>UUID:</strong> {props.Player.UUID}</span>
                <span><strong>Public IP:</strong> {props.Player.IP}</span>
                <span><strong>id:</strong> {props.Player.id}</span>

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
export default InfoBannedModal;