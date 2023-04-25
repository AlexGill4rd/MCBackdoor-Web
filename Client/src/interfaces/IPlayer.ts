import { gamemode } from "../enums/gamemode";
import IServer from "./IServer";

export default interface IPlayer {
    id: number;
    displayname: string;
    name: string;
    uuid: string;
    favicon: string;
    ip_address: string;
    server: IServer;
    add_Date: Date;
    operator_state: boolean;
    health_level: number;
    gamemode: gamemode;
    location: {
        x: number;
        y: number;
        z: number;
        world: string;
    };
}