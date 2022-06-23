import { Tooltip } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import './ChatStyle.scss';

function Chat(props: {Server: any, Messages: string[]}) {
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const divRef = useRef<null | HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState<boolean>(false);
    useEffect(() => {
        if (!scrolled){
            scrollRef.current?.scrollIntoView({ behavior: 'auto' });
        }
    }, [props.Messages, scrolled]);
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
            {props.Messages.length > 0 ? props.Messages.map((data:any) => {
                var formatMessage:any = [
                    <div className='chat-message' key={data.Message}>
                        <Tooltip title={data.Date} disableInteractive placement='top'>
                            <div className='chat-message-sender'>{data.Player.Displayname}</div>
                        </Tooltip>
                        <div className='chat-message-devider'>{">>"}</div>
                        <div className='chat-message-message'>{data.Message}</div>
                    </div>
                ]
                return formatMessage;
            }) :
            <>Geen berichten gevonden!</>}
            <div ref={scrollRef}/>
        </div>
    );
}
export default Chat;