import { Button, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";

import FileModal from './dashboard/FileModal';
import './PluginsStyle.scss';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { socket } from '../../../../socket/socket';

function Files(props: {Server: any}) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [files, setFiles] = useState<any[]>([]);

    const [browsingPath, setBrowsingPath] = useState<string>("");
    const [mainPath, setMainPath] = useState<string>("");

    //Do a request to the server to receive all the file names and types
    useEffect(function requestFiles() {
        socket.emit("feature:server", socket.id, props.Server.Servername, "server-files", {})
    }, []);

    //When file data received, the data wil be saved in the variables
    useEffect(function loadFiles() {
        socket.on(`server:get-file-list`, (files, mainpath, path) => {
            files.map((file: any) => {
                var iconPath:string = "folder.png";
                if (file.Extension.includes("jar"))
                    iconPath = "java.png";
                else if (file.Extension.includes("json") || file.Extension.includes("properties") || file.Extension.includes("yml") || file.Extension.includes("txt"))
                    iconPath = "notepad.png";
                else if (file.Extension.includes("png"))
                    iconPath = "image.png";
                else if (file.Extension.includes("zip") || file.Extension.includes("gz"))
                    iconPath = "zip.png";
                else if (file.Extension !== "")
                    iconPath = "empty.png";
                file.Icon = iconPath;
            })
            files.sort(function(a:any, b:any) {
                return compareStrings(a.Icon, b.Icon);
            })
            if (path !== undefined)
                setBrowsingPath(path);
            else {
                setBrowsingPath(mainpath);
                setMainPath(mainpath);
            }
            setFiles(files);
        });
    }, []);
    function compareStrings(a:any, b:any) {
        a = a.toLowerCase();
        b = b.toLowerCase();
      
        return (a < b) ? -1 : (a > b) ? 1 : 0;
      }
    function handleModalOpen(){
        setModalIsOpen(true);
    }
    function handleModalClose(){
        setModalIsOpen(false);
    }
    function handleUploadFile(){
        handleModalClose();
    }
    //Folder event functions
    function handelFolderDelete(folder: any) {
        socket.emit("feature:server", socket.id, props.Server.Servername, "folder-remove", {"Path": folder.Path})
    }
    function handelFolderOpen(folder: any) {
        socket.emit("feature:server", socket.id, props.Server.Servername, "folder-open", {"Path": folder.Path})
    }
    //File event function
    function handelFileDelete(file: any) {
        socket.emit("feature:server", socket.id, props.Server.Servername, "file-delete", {"Path": file.Path})
    }
    function handelFileDownload(file: any) {
        socket.emit("feature:server", socket.id, props.Server.Servername, "file-download", {"Path": file.Path})
    }
    useEffect(function listenFileDownload() {
        socket.on(`server:download-file-${props.Server.Servername}`, data => {
            var bytes = new Uint8Array(data.File);

            var blob=new Blob([bytes], {type: `application/${data.Extension}`});

            var link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=data.Name;
            link.click();
        });
    }, []);
    function handlePathBack(){
        if (mainPath === browsingPath){
            socket.emit("feature:server-log", socket.id, "Je kan niet verder terug dan je main path!", "error");
        }else{
            var splitted = browsingPath.split("\\");
            var newPath = splitted[0];
            for (var i = 1; i < splitted.length - 1; i++){
                newPath += "\\" + splitted[i];
            }
            socket.emit("feature:server", socket.id, props.Server.Servername, "folder-open", {"Path": newPath})
        }
    }
    function handleFileUpload(url: any){
        var data = {
            Path: browsingPath,
            URL: url
        }
        socket.emit("feature:server", socket.id, props.Server.Servername, "file-upload", data)
        handleModalClose();
    }
    return (
        <div className='plugins'>
            <div className='plugins-header'>
                <Button 
                    onClick={handleModalOpen} 
                    variant="contained" 
                    startIcon={<AddIcon />}
                    >
                        Upload File
                </Button>
                <Tooltip title="Klik om terug te gaan" disableInteractive placement='top'>
                    <div onClick={handlePathBack} className='plugins-header-path'><ArrowBackIcon style={{marginRight: "10px"}} />{browsingPath}</div>
                </Tooltip>
            </div>
            <div className='plugins-container'>
                <div className='plugins-container-list'>
                    {files.map((file:any, index:number) => {
                        if (file.Icon.includes("folder")){
                            return (
                                <Menu key={index} className='item-contextmenu' menuButton={
                                    <div key={file.Name} onDoubleClick={() => handelFolderOpen(file)} className='plugins-file noselect'>
                                        <img src={"/icons/" + file.Icon} alt="bestand type" />
                                        <div className='plugins-file-name'>{file.Name}</div>
                                    </div>
                                }>
                                    <MenuHeader>Optie's</MenuHeader>
                                    <MenuItem className='item-context-button' onClick={() => handelFileDownload(file)}><DownloadIcon /><span>Download File</span></MenuItem>
                                    <MenuItem className='item-context-button' onClick={() => handelFolderOpen(file)}><FileOpenIcon /><span>Open Folder</span></MenuItem>
                                    <MenuItem className='item-context-button' onClick={() => handelFolderDelete(file)}><DeleteIcon /><span>Delete Folder</span></MenuItem>
                                </Menu>
                                
                            );
                        }else{
                            return (
                                <Menu key={index} className='item-contextmenu' menuButton={
                                    <div key={file.Name} className='plugins-file noselect'>
                                        <img src={"/icons/" + file.Icon} alt="bestand type" />
                                        <div className='plugins-file-name'>{file.Name}</div>
                                    </div>
                                }>
                                    <MenuHeader>Optie's</MenuHeader>
                                    <MenuItem className='item-context-button' onClick={() => handelFileDelete(file)}><DeleteIcon /><span>Delete File</span></MenuItem>
                                    <MenuItem className='item-context-button' onClick={() => handelFileDownload(file)}><DownloadIcon /><span>Download File</span></MenuItem>
                                </Menu>
                                
                            );
                        }
                    })}
                </div>
            </div>
            {modalIsOpen && <FileModal onAccept={handleFileUpload} onCancel={handleModalClose} />}
        </div>
    );
}
export default Files;