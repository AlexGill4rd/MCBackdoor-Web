import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../../../socket/socket';
import './ChatStyle.scss';

function Chat(props: {Server: any}) {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(function listenMessages() {
        socket.on(`server:server-chat-${props.Server.Servername}`, data => {
            var formatMessage:any = [
                <div className='chat-message' key={data.Message}>
                    <Tooltip title={new Date().toLocaleTimeString()} disableInteractive placement='top'>
                        <div className='chat-message-sender'>{data.Player.Displayname}</div>
                    </Tooltip>
                    <div className='chat-message-devider'>{">>"}</div>
                    <div className='chat-message-message'>{data.Message}</div>
                </div>
            ]
            setMessages((messages: any) => [...messages, formatMessage])
        });
    }, []);

    const scrollRef = useRef<null | HTMLDivElement>(null);
    const divRef = useRef<null | HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState<boolean>(false);
    useEffect(() => {
        if (!scrolled){
            scrollRef.current?.scrollIntoView({ behavior: 'auto' });
        }
    }, [messages, scrolled]);
    function handleScroll(){
        if (divRef.current?.scrollHeight !== undefined){
            var scrolledToBottom:number = Math.abs(divRef.current?.scrollHeight - divRef.current?.clientHeight - divRef.current?.scrollTop);
            if (scrolledToBottom === 0){
                setScrolled(false);
            }else {
                setScrolled(true);
            }
        }
    }

    return (
        <div className='chat-messages' ref={divRef} onScroll={handleScroll}>
            {messages.length > 0 ? messages.map((message:string, index: number) => {
                return message;
            }) :
            <>Geen berichten op dit moment</>}
            <div ref={scrollRef}/>
        </div>
    );
}
export default Chat;