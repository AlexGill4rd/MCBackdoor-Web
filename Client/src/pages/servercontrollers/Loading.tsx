import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import './LoadingStyle.scss';

function Loading(props: {to: string}) {
    return(
        <div className='loading'>
            <div style={{marginBottom: "10px"}}>Server momenteel offline</div>
            <Link to={props.to}>
                <div style={{marginBottom: "10px"}}>Ga terug</div>
            </Link>
            <CircularProgress />
        </div>
    );
}
export default Loading;