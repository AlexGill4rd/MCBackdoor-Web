import { Tooltip } from '@mui/material';

import './ExperiencePanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function ExperiencePanel(props: {Server:any, player: any;}){
    const [experience, setExperience] = useState<number>(0);

    //INISIALISATION
    function sendExperience(){
        var actionJSON = {
            ExperienceLevel: experience,
            Type: "set"
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "experience", actionJSON);
    }
    //Listeners & requesters
    useEffect(function loadPlayerExperience(){
        var actionJSON = {
            ExperienceLevel: experience,
            Type: "get"
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "experience", actionJSON);
    }, []);
    useEffect(function listenPlayerEXP() {
        socket.on(`player:get-experience`, data => {
            setExperience(data.Level);
        })
    }, []);

    //Function
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
            </div>           
        </>
    );
}
export default ExperiencePanel;