import { useEffect, useState } from 'react';
import './MobSpawnerStyle.scss';

import Entities from './mobspawner/Entities';

function MobSpawner(props: {Server: any}){

    const [entities, setEntities] = useState<any>(Entities);

    return (
        <div className='mobspawner'>
            <div className='mobspawner-mobs'>
                <div className='mobspawner-mobs-list'>
                    {entities.map((entity: any) => {
                        return (
                            <div className='mobspawner-mobs-list-mob'>
                                <span style={{backgroundImage: "url(https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/40/EntityCSS.png/revision/latest?cb=20220403171058&version=1648264226195&format=original)", backgroundPosition: "-112px -0px"}}></span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='mobspawner-settings'>
                
            </div>
        </div>
    );
}
export default MobSpawner;