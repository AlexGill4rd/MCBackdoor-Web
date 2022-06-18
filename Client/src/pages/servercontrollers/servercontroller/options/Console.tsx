import { Button, Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../../../socket/socket";

import SendIcon from '@mui/icons-material/Send';

import './ConsoleStyle.scss';

function Console(props: {Server: any}){
    const [messages, setMessages] = useState<any[]>([]);
    const [shownMessages, setShownMessages] = useState<string[]>([]);

    useEffect(function requestMessage(){
        socket.emit(`client:server-console-messages`, props.Server);
    }, []);
    useEffect(function updateMessages(){
        socket.on(`server:server-console-messages-${props.Server.Servername}`, data => {
            setMessages([]);
            setMessages(data);
        })
    }, []);
    useEffect(function listenAddMessage(){
        socket.on(`server:console-message-${props.Server.Servername}`, data => {
            setMessages((messages: any) => [...messages, data]);
        })
    }, [props.Server]);

    const divRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [shownMessages]);

    const [command, setCommand] = useState<string>("");
    const [history, setHistory] = useState<any[string]>([]);
    function handleCommandChange(e:any){
        setCommand(e.target.value);
    }
    function sendConsoleCommand(){
        if (props.Server !== null){
            var data = {
                Option: "console-commmand",
                Server: props.Server,
                Command: command
            }
            socket.emit(`client:server-option`, data);
            setHistory((history: any) => [...history, command]);
            setCommand("");
        }
    }
    const [index, setIndex] = useState<number>(-1);
    function checkKey(e: any) {
        e = e || window.event;

        if (e.keyCode == '38') {
            if (index + 1 < history.length)
                setIndex(index + 1);
            // up arrow
        }else if (e.keyCode == '40') {
            if (index - 1 >= -1)
            setIndex(index - 1);  
            // down arrow
        }else if (e.key === "Enter") {
            handleFormSubmit();
        }
    }
    useEffect(() => {
        if(index === -1)
            setCommand("");
        else{
            if (history.length > 0)
            setCommand(history.reverse()[index]);
            history.reverse()
        }
    }, [index]);
    function handleFormSubmit() {
        sendConsoleCommand();
    }
    //COMBO BOX HANDLERS
    const [filters, setFilters] = useState<string[]>(["ALL"]);

    const handleFilterChange = (event: SelectChangeEvent<typeof filters>) => {
        const {
        target: { value },
        } = event;
        setFilters(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    useEffect(function filterUpdate() {
        setShownMessages([]);
        messages.map((message: any) => {
            if (filters.includes(message.Type.toUpperCase()) || filters.includes("ALL")){
                setShownMessages((shownMessages: any) => [...shownMessages, message]);
            }
        });
    }, [filters, messages]);
    return (
        <div className="console">
            <div className="console-container">
                <div className="console-container-messages">
                    {shownMessages.length > 0 ? shownMessages.map((data: any, index: number) => {
                        var datum = new Date(data.Date);
                        return (
                            <div key={index} className="console-message">
                                <div className="console-message-type" style={data.Type.toLowerCase() === "info" ? {color: "#a9b500"} : {color: "red"} }> {"[" + data.Type + "]"} </div> |  
                                <Tooltip title={"Datum: " + datum.toDateString()} disableInteractive placement="top">
                                    <div className="console-message-datum">{ datum.toLocaleTimeString() }</div> 
                                </Tooltip>
                                |<div className="console-message-message">{data.Message}</div>
                            </div>
                        );
                    }) : <div className="console-message">Geen berichten van de console om weer te geven!</div>}
                    <div ref={divRef} />
                </div >
                <form className="console-container-commandline" onSubmit={handleFormSubmit} onKeyDown={checkKey}>
                    <input autoComplete="off" type="text" onChange={handleCommandChange} value={command} id="lcommand" name="command" placeholder="Geef een commando in..." />
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={filters}
                        onChange={handleFilterChange}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        sx={{
                            width: 160,
                            height: 34.39,
                            marginLeft: "10px",
                        }}
                        >
                        {filterList.map((filter) => (
                            <MenuItem key={filter} value={filter}>
                                <Checkbox checked={filters.indexOf(filter) > -1} />
                                <ListItemText primary={filter} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Button 
                        onClick={sendConsoleCommand} 
                        variant="contained" 
                        startIcon={<SendIcon />}
                    >
                        Send Command
                    </Button>
                </form>
            </div>
        </div>
    );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 160,
      },
    },
};
const filterList = [
    'ALL',
    'INFO',
    'WARN',
    'ERROR',
    'FATAL',
    'TRACE',
    'OFF',
    'DEBUG',
  ];
export default Console;