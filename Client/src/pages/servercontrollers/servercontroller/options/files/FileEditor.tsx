import './FileEditorStyle.scss';

import { Button } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { socket } from '../../../../../socket/socket';
import CodeEditor from '@uiw/react-textarea-code-editor';

function FileEditor(props: {Server: any, File: any, onClose: any, onSave: any}) {
    const [code, setCode] = useState<any>("");
    const [language, setLanguage] = useState<any>("");
    const [oldFile, setOldFile] = useState<any>(undefined);

    useEffect( () => {
        function requestTextFromFile() {
            socket.emit("feature:server", socket.id, props.Server.Servername, "file-text", {"Path": props.File.Path})
        }
        function updateTextFromFile() {
            socket.on(`server:file-text-${props.Server.Servername}`, (file, name, extension) => {
                setOldFile(props.File);
                var bytes = new Uint8Array(file);
                var blob = new Blob([bytes], {type: `application/${extension}`});
                setLanguage(extension)
                var reader = new FileReader();
                reader.onload = function() {
                    setCode(reader.result);
                }
                reader.readAsText(blob);
            })
        }
        requestTextFromFile()
        updateTextFromFile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='fileeditor'>
            <div className='fileeditor-header'>
                <div className='fileeditor-header-title'>{props.File.Name}</div>
                <div className='fileeditor-header-options'>
                    <Button 
                        onClick={() => props.onSave(code, oldFile)} 
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
                <CodeEditor 
                    value={code} 
                    language={language}
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        fontSize: "1em",
                        width: "100%",
                        borderRadius: "10px",
                        overflowY: "auto",
                    }}
                />
            </div>
        </div>
    );
}
export default FileEditor;