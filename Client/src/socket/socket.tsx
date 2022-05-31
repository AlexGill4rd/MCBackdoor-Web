import IpAddress from "../IpAddress";
import socketIOClient from "socket.io-client";

var ip = new IpAddress();
export const socket = socketIOClient(`http://${ip.getIP()}:3001`);