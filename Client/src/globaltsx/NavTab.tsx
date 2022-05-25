import { Link, To } from 'react-router-dom';

import './NavTabStyling.scss';

function NavTab(props: { path: To, title: String, description: String; }){
    return (
        <Link to={props.path} className='navtab-button'>
                <div className='navtab-button-title'>{props.title}</div>                  
                <div className='navtab-button-description'>{props.description}</div>                  
        </Link>
    );
}
export default NavTab;