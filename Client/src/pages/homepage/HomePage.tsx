import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import './styling/HomePageStyling.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function HomePage(){

    return (
        <div className="homepage-container">
            <div className='homepage-panel'>
                <div className='homepage-panel-info'>
                    <div className='homepage-tab2' style={{borderRadius: "20px 0 0 0"}}>
                        <img src='/icons/homepage/home.png' alt='home icon' />
                        <h4>Waarom heb ik dit gemaakt?</h4>
                        <p>Een project gemaakt om mijn kennis uit te breiden. Uit het maken van projecten leer je het meest.</p>
                    </div>
                    <div className='homepage-tab' style={{borderRadius: "0 20px 0 0"}}>
                        <img src='/icons/homepage/dashboard.png' alt='home icon' />
                        <h4>Hoe werkt het?</h4>
                        <p>Bij het injecteren van de code in een minecraft plugin zal jij als eigenaar in staat zijn toegang te krijgen tot de complete server.</p>
                    </div>
                    <div className='homepage-tab2' style={{borderRadius: "0 0 0 20px"}}>
                        <img src='/icons/homepage/folder.png' alt='home icon' />
                        <h4>Wat kan je doen?</h4>
                        <p>Met het paneel kan je de voledige contole krijgen over een bepaalde server. Zo kan je de file's aanpassen en meer.</p>
                    </div>
                    <div className='homepage-tab' style={{borderRadius: "0 0 20px 0"}}>
                        <img src='/icons/homepage/danger.png' alt='home icon' />
                        <h4>Warning!</h4>
                        <p>This project is made for educational purposes only. So you are not allowed to use it outside your own test zone!</p>
                    </div>
                </div>
                <div className='homepage-panel-button'>
                    <Link to='/controller/homepage'>
                        <Button 
                            variant="contained" 
                            startIcon={<ArrowForwardIosIcon />}
                            sx={{width: "100%"}}
                        >
                            Ga verder
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default HomePage;