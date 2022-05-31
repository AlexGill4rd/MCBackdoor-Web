import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../../socket/socket";

import './LogginControllerPageStyle.scss'

function LogginControllerPage(){
    const [messages, setMessages] = useState<any>([]);
    const { serverid } = useParams();
    const [server, setServer] = useState<any>([]);

    const divRef = useRef<null | HTMLDivElement>(null);

    useEffect(function loadServer(){
        socket.emit("client:mcserver-get", serverid)
    }, []);
    useEffect(function updateServer(){
        socket.on(`server:mcserver-get`, data => {
            setServer(JSON.parse(data.JsonData))
            socket.emit("client:get-server-logs", data.Name)
        })
    }, []);
    useEffect(function updateLogs(){
        socket.on("server:update-logging", data => {
            if (data.Servername === server.Address){
                setMessages(data);
            }
        })
    }, []);
    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className="logging-container">
            <div className="logging-panel">
                <div className="logging-panel-message-container">
                    {messages.map((message: { Date: string; Message: string; }, index: number) => {
                        return (<div key={index}>
                        <div className="logging-panel-message-container-message">
                            <span className="logging-panel-message-container-message-date">
                                {new Date(message.Date).toLocaleTimeString() + " - "}
                            </span>
                            <span className="logging-panel-message-container-message">
                                {message.Message}
                            </span>
                            </div>
                        </div>
                            
                        );
                    })}
                    <div ref={divRef} />
                </div>
            </div>
        </div>
    );
}
export default LogginControllerPage;