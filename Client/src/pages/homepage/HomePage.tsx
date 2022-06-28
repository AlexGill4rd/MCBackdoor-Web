import { Link } from 'react-router-dom';

import './styling/HomePageStyling.scss';

function HomePage(){

    return (
        <div className="homepage-container">
            <div className='homepage-panel'>
                <div className='homepage-left'>
                    <Link to='/controller/homepage'>
                        <div className='homepage-left-button'>
                            <div className='homepage-buttons-button-title'>Home</div>                  
                        </div>
                    </Link>
                </div>
                <div className='homepage-right'>
                    <h1>Virus V5</h1>
                    <h2>Waarvoor dit panel?</h2>
                    <p>Het paneel is psecifiek ontworpen om op basis van een minecraft plugin in staat te zijn een server via deze webpagina compleet over te namen. De persoon met toegang tot de webpagina is in staat de server te beheren naar zijn eisen.</p>
                </div>
            </div>
        </div>
    );
}
export default HomePage;