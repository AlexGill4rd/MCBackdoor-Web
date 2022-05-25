import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import './HeaderStyling.scss';

function Header(props: {title: string, path: string;}){
    return (
        <div className='header'>
            <Tooltip title="Ga terug naar vorige pagina!">
                <Link to={props.path}>
                    <div className='header-title'>{props.title}</div>
                </Link>
            </Tooltip>
        </div>
    );
}
export default Header;