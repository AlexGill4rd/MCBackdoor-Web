import { Tooltip } from '@mui/material';
import './EnchantmentStyle.scss';

function Enchantment(props: {Name: string, Level: number, onClick: any}){
    return (
        <Tooltip placement="top" title={props.Name} disableInteractive>
            <div className="enchantment" onClick={() => props.onClick(props.Name)}>
                <img alt='Enchantment icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABWElEQVR4XmMY8YCR0hAwUGT5j82MC/f/EGU200BHAQupDkD3sSIPD9gIYVl2MP3+8x+okR/BIUMoJAY8BAjGEyEfEwrBM9ffgpXgConBFwKk+vj+7c9gHyqq8uINDFwhMfAhgMvHTALMYB8J8hKXUQiFBCx33H3yESVNDJ4QgOVnXD4nNq4JqYPJv/3zCxwSgzcNwEo29KRNbEjA9MHUw/jipgFg5rJly8Bl0OCrC1I6loJdOKciGkyjhwSh/I7u45CiXrA5cnJyYPrRo0ewEADTA58GxARYwbWWtSw32EVNyw6juBQWEoRyByyO0X0ME4f5fGZXLiRkWdgGSQjAXEhsSHz68YsBGZDq48uvf6PoH3y1IaGQgMUlLFUTimN0H7/68BulDTJ4W0TEhsSavmKUOCXkYwY0MPjbhOghgZ4LSPXx0AsB9HIC3QfoqZqBRDDgaYBhxAMAhwej2pc/5zUAAAAASUVORK5CYII='/>
                <div className='enchantment-level'>{props.Level}</div>
            </div>
        </Tooltip>
    );
}
export default Enchantment;