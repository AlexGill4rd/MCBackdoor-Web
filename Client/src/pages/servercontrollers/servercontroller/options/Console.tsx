import { useEffect, useRef, useState } from "react";
import { socket } from "../../../../socket/socket";

import './ConsoleStyle.scss';

function Console(props: {Server: any}){
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(function requestMessage(){
        socket.emit(`client:server-console-messages`, props.Server);
    }, []);
    useEffect(function updateMessages(){
        socket.on(`server:server-console-messages-${props.Server.Address}`, data => {
            setMessages(data);
        })
    }, []);
    useEffect(function listenAddMessage(){
        socket.on(`server:server-console-message-add-${props.Server.Address}`, data => {
            setMessages((messages: any) => [...messages, data]);
        })
    }, []);

    const divRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);
    return (
        <div className="console">
            <div className="console-container">
                <div className="console-container-messages">
                    {messages.map((data: any, index: number) => {
                        return (
                            <div key={index} className="console-message">
                                {data.Datum + " - " + data.Message}
                            </div>
                        );
                    })}
                </div >
                <div ref={divRef} />
            </div>
        </div>
    );
}
export default Console;