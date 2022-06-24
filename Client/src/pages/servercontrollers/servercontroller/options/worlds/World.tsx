import './World.scss';

function World(props: {World: any,onSelect: any}){
    return (
        <div className='world'>
            <img src={"/icons/defaultworld.jpg"} alt='Default world icon' onClick={() => props.onSelect(props.World)} />
            <span>{props.World.Worldname}</span>
        </div>
    );
}
export default World;