import { Tooltip } from '@mui/material';
import './OperatorPanelStyle.scss';
import './PanelStyle.scss';

function OperatorPanel(props: {player: any;}){
    console.log(props.player)
    return (
        <>
            <div className='panel-header'>
                Operator Panel - {props.player.playerName}
            </div>
            <div className='panel-line'></div>
            <div className='operatorpanel-container'>
                <div className='operatorpanel-buttons'>
                    <Tooltip title='Geef de geselecteerde speler operator'>
                        <div className='operatorpanel-buttons-button'>Geef Operator</div>
                    </Tooltip>
                    <Tooltip title='Haal de operator bij de speler weg'>
                        <div className='operatorpanel-buttons-button'>Neem Operator Weg</div>
                    </Tooltip>
                </div>
            </div>
            
        </>
    );
}
export default OperatorPanel;