import { Link, To } from 'react-router-dom';

import './NavTabStyling.scss';

function NavTab(props: { path: To, title: string, description: string, image: string}){
    return (
        <Link to={props.path} className='navtab-button'>
            <img src={props.image} alt={props.title} />
                <div className='navtab-button-title'>{props.title}</div>                  
                <div className='navtab-button-description'>{props.description}</div>                  
        </Link>
    );
}
export default NavTab;