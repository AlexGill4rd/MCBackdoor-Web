import { Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import './EditModalStyle.scss';

import { FaClipboardList } from 'react-icons/fa';

function EditItemModal(props: {onCancel: any}){
    return (
        <div className="editmodal-container">
            <div className='editmodal-backdrop' onClick={() => props.onCancel()}></div>
            <div className='editmodal-menu'>
                <div className='editmodal-menu-title'>Item Aanpassen</div>
                <form>
                    <InputLabel htmlFor="input-with-icon-adornment">
                    Geef de displayname
                    </InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                        <FaClipboardList />
                        </InputAdornment>
                    }
                    />
                </form>
            </div>
        </div>
    );
}
export default EditItemModal;