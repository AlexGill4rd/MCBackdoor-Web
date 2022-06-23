import { Button, FormControl, InputLabel, Select, Tooltip } from '@mui/material';
import './PanelStyle.scss';

import './PMSpamPanelStyle.scss';

import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';

const messagesList = [
    'Als duizend schilders duizend jaar zouden werken, zouden ze geen kunstwerk kunnen maken dat net zo mooi is als jij.',
    "Als een dikke man je 's nachts in een tas stopt, maak je dan geen zorgen, ik heb de kerstman gevraagd dat ik je wilde hebben voor kerst.",
    "Als een ster zo ver weg staat, hoe kan jij dan zo dichtbij komen?",
    "Als ik je een cijfer zou moeten geven tussen 1-10, zou ik je een 9 geven omdat ik die ene ben die je nog mist.",
    "Als ik een euro kreeg voor elke keer dat ik aan jou dacht, dan zou ik nu in een hogere belastingschijf zitten.",
    "Als ik het alfabet opnieuw zou kunnen rangschikken, zou ik de J van jij en de I van ik samen zetten.",
    "Als in mijn dromen de enige plaats was waar ik je kon zien, dan zou ik eeuwig slapen.",
    "Als je denkt mij te kunnen versieren, dan heb je het goed!",
    "Als jij een boom zou zijn, zou ik je omarmen als een koala beertje.",
    "Als niets eeuwig duurt, word jij dan mijn niets?",
    "Als schoonheid tijd was, zou jij de eeuwigheid zijn.",
    "Bel de politie, want het moet wel illegaal zijn om er zo goed uit te zien.",
    "Ben je gelovig? Omdat je het antwoord bent op al mijn gebeden.",
    "Ben jij mijn telefoonoplader? Want zonder jou zou ik sterven.",
    "Bent jij misschien een woordenboek? Omdat je de betekenis toevoegt aan mijn leven.",
    "Ben jij niet moe? Want je loopt al uren rondjes in mijn gedachten.",
    "Deed het pijn toen je uit de hemel viel?",
    "Die kleding staat je echt heel mooi.",
    "Die mooie jurk kleurt goed bij mijn auto.",
    "Droom ik, of komt dat door jou?",
    "Er is iets mis met mijn telefoon, jouw nummer staat er niet in!",
    "Er is maar één ding dat ik zou willen veranderen aan je, en dat is je achternaam.",
    "Er is vast iets mis met mijn ogen, want ik kan ze niet van je afhouden.",
    "Er zijn honderden openingszinnen, als jij me nou eens zegt welke werkt?",
    "Ga je me nog kussen of moet ik tegen mijn dagboek liegen?",
    "Geen wonder dat de lucht vandaag zo grijs en grauw is, al het blauw zit in je ogen.",
    "Geloof je in liefde op het eerste gezicht, of moet ik nog een keer langslopen?",
    "Haal een ijsklontje uit je drankje en smijt die kapot op de grond en zeg tegen haar: Zo nu is het ijs gebroken!",
  ];
  

function PMSpamPanel(props: {Server: any, player: any;}){
    const [value, setValue] = useState<string[]>([]);

    function startPlayerSpamming(status: boolean){
        var actionJSON = {
            Messages: messagesList.toString(),
            State: status
        }
        socket.emit("feature:player", socket.id, props.Server.Servername, props.player.UUID, "pmspam", actionJSON);
    }
    return (
        <>
            <div className='panel-header'>
                Private Message Panel - {props.player.Displayname}
            </div>
            <div className='panel-line'></div>
            <div className='pmspampanel-container'>
                <div className='pmspampanel-buttons'>
                <FormControl className='pmspampanel-form'>
                    <InputLabel shrink htmlFor="select-multiple-native">
                    Berichten
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={value}
                        label="Berichten"
                        className='pmspampanel-form-select'
                        inputProps={{ 
                            id: 'select-multiple-native',
                            size: 15,
                         }}
                        >
                        {messagesList.map((message) => (
                            <option key={message} value={message}>
                                {message}
                            </option>
                        ))}
                    </Select>
                    <Button 
                    variant="outlined"
                    sx={{ width: "100%", margin: "10px 0"} } onClick={() => startPlayerSpamming(true)}>Start Spamming</Button>
                           <Button 
                    variant="outlined"
                    sx={{ width: "100%"} } onClick={() => startPlayerSpamming(false)}>Stop Spamming</Button>
                </FormControl>
                </div>
            </div>
            
        </>
    );
}
export default PMSpamPanel;