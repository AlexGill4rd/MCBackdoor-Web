import { Button, FormControl, FormLabel, Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './BanPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import frLocale from 'date-fns/locale/fr';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function BanPanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");

    const [banMessage, setBanMessage] = useState<string>("");
    const [banDuration, setBanDuration] = useState<Date | null>(null);
    const [typeBan, setTypeBan] = useState<string>("permban");

    function banPlayer(){
        var data = {
            Player: props.player,
            Feature: "ban",
            Message: banMessage,
            To: new Date(banDuration + " UTC")?.toISOString()
        }
        socket.emit("client:features-change", data);
    }
    useEffect(function listenMessages(){
        socket.on(`server:features-change-message`, data => {
            if (data.includes("fout"))setError(true);
            else setError(false);
            setInfoMessage(data);
        })
    }, []);
    function setInfoMessage(data: string){
        setMessage(data);
        setTimeout(function(){
            if (message !== data)
                setMessage("");
        }, 5000)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeBan((event.target as HTMLInputElement).value);
        setBanDuration(null);
    };
    function handleMessageChange (e: any) {
      setBanMessage(e.target.value);
    };
    return (
        <>
            <div className='panel-header'>
                Crash Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='banpanel-container'>
                <form className='banpanel-form'>
                    <TextField className='banpanel-form-messagebox' id="standard-basic" onChange={handleMessageChange} label="Ban message" variant="standard" value={banMessage} />
                    <RadioGroup className='banpanel-mid'
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="permban"
                        name="radio-buttons-group"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="permban" control={<Radio />} label="Perm Banned" />
                        <FormControlLabel value="duration" control={<Radio />} label="Time Banned" />
                        
                        {typeBan === "duration" ?
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale} >
                                    <DateTimePicker
                                        minDate={new Date()}
                                        InputProps={{ sx: { 
                                            width: "200px",
                                         } }}
                                        renderInput={(props) => <TextField {...props} />}
                                        label="DateTimePicker"
                                        inputFormat="dd/MM/yyyy hh:mm"
                                        value={banDuration}
                                        onChange={(newValue) => {
                                        setBanDuration(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                             :
                            <></>
                        }
                    </RadioGroup>
                    <Button 
                    variant="outlined"
                    sx={{ width: "100%"} } onClick={banPlayer}>Speler Verbannen</Button>

                </form>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default BanPanel;