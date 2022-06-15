import { Tooltip } from '@mui/material';

import './ExperiencePanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function ExperiencePanel(props: {player: any;}){
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [experience, setExperience] = useState<number>(0);

    //INISIALISATION
    function sendExperience(){
        var data = {
            Player: props.player,
            Feature: "experience",
            ExperienceLevel: experience,
            Type: "set"
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

    //FUNCTIONS
    useEffect(function loadPlayerExperience(){
        var data = {
            Player: props.player,
            Feature: "experience",
            Type: "get"
        }
        socket.emit("client:features-change", data);
        socket.on(`server:player-experience-${props.player.UUID}`, data => {
            console.log(data)
            setExperience(data.Level);
        })
    }, []);
    function handleExperienceChange (e: any) {
        setExperience(e.target.value)
    }
    return (
        <>
            <div className='panel-header'>
                Experience Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='experience-container'>
                <form className='experience-form'>
                    <label>Experience Level:</label>
                    <input type="number" onChange={handleExperienceChange} placeholder="Geef de experience in..." value={experience} />
                    <Tooltip title='Geef de speler opgegeven experience' onClick={sendExperience}>
                        <div className='experience-form-button'>Give Experience</div>
                    </Tooltip>
                </form>
                {error ? 
                <div className='message' style={{color: 'red'}}>{message}</div> :  
                 <div className='message' style={{color: "lime"}}>{message}</div>
                 }
                
            </div>
            
        </>
    );
}
export default ExperiencePanel;