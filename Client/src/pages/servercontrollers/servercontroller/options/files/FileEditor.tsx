import './FileEditorStyle.scss';

import { Button } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function FileEditor(props: {Server: any, File: any, onClose: any, onSave: any}) {
    const [text, setText] = useState<any>("");
    const [formattedText, setFormattedText] = useState<any[]>([]);

    useEffect(function requestTextFromFile() {
        socket.emit("feature:server", socket.id, props.Server.Servername, "file-text", {"Path": props.File.Path})
    }, []);
    useEffect(function requestTextFromFile() {
        socket.on(`server:file-text-${props.Server.Servername}`, (file, name, extension) => {
            var bytes = new Uint8Array(file);
            var blob=new Blob([bytes], {type: `application/${extension}`});

            var reader = new FileReader();
            reader.onload = function() {
                setText(reader.result);
            }
            reader.readAsText(blob);
        })
    }, []);
    useEffect(() => {
        if (text !== ""){
            var lines: any[] = text.split(/\n/)
            lines.map((line:string) => {
                var splitted = line.split("=");
                var format = {};
                if (splitted.length === 2){
                    format = {
                        IsSetting: true,
                        Setting: splitted[0],
                        Value: splitted[1]
                    }
                }else{
                    format = {
                        IsSetting: false,
                        Text: line
                    }
                }
                setFormattedText((formattedText:any) => [...formattedText, format]);
            })
        }
    }, [text]);

    return (
        <div className='fileeditor'>
            <div className='fileeditor-header'>
                <div className='fileeditor-header-title'>{props.File.Name}</div>
                <div className='fileeditor-header-options'>
                    <Button 
                        onClick={props.onSave} 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                        >
                            Save File
                    </Button>
                    <Button 
                        onClick={props.onClose} 
                        variant="contained" 
                        startIcon={<CancelIcon />}
                        >
                            Cancel
                    </Button>
                </div>
            </div>
            <div className='fileeditor-editor'>
                {
                    formattedText.map((format: any, index: number) => {
                        if (format.IsSetting){
                            return (
                                <div key={index} className='editor-line' contentEditable="true" suppressContentEditableWarning={true}>
                                    <div className='editor-setting'>
                                        {format.Setting === "" ? "" : format.Setting + "="}
                                    </div>
                                    <span className='editor-value'>{format.Value === undefined ? " " : format.Value}</span>
                                </div>
                            );
                        }else{
                            return (
                                <div key={index} className='editor-line' contentEditable="true" suppressContentEditableWarning={true}>
                                    <div className='editor-text'>
                                        {format.Text}
                                    </div>
                                </div>
                            );
                        }
                        
                    })
                }
            </div>
        </div>
    );
}
export default FileEditor;