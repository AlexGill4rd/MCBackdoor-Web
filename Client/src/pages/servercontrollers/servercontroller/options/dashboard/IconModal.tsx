import './IconModalStyle.scss';
import { Button, Input, Tooltip } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { socket } from '../../../../../socket/socket';

function IconModal(props: {onCancel: any, onAccept: any;}){

    const [file, setFile] = useState<any>(undefined);
    const [image, setImage] = useState<any>(undefined);

    const [width, setWidth] = useState<any>(0);
    const [height, setHeight] = useState<any>(0);
    const imgRef = useRef<any>()

    function handleFileSelect(e: any){
        var file = e.target.files[0];
        var extension = file.name.split('.').pop().toLowerCase();
        if (extension === "png"){
            setFile(file);
            socket.emit("feature:server-log", socket.id, "Correcte afbeelding geselecteerd!", "success");
        }else{
            setFile(undefined)
            setImage(undefined)
            setWidth(0)
            setHeight(0)
            socket.emit("feature:server-log", socket.id, "Fout formaat van file! Geef een .PNG mee.", "warning");
        }
    }
    useEffect(() => {
        if (file === undefined)return;
        var objectUrl:any = window.URL.createObjectURL(file)
        setImage(objectUrl)
     }, [file])
    function loadImageDimenstions(){
        setWidth(imgRef.current.naturalWidth)
        setHeight(imgRef.current.naturalHeight)
    }
    async function handleChangeServericon(){
        if (file === undefined){
            socket.emit("feature:server-log", socket.id, "Geef een afbeelding in die je wenst in te stellen!", "warning");
        }else{
            props.onAccept(await toBase64(file));
        }    
    }
    const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return (
        <div className='iconmodal'>
            <div className='iconmodal-backdrop' onClick={() => props.onCancel()}></div>

            <div className='iconmodal-menu'>
                <div className='iconmodal-menu-title'>Selecteer een bestand</div>
                {file && <img onLoad={loadImageDimenstions} src={image} ref={imgRef} alt="selectie" /> }
                {(width === 64 && width !== 0) && <div className='iconmodal-imageinfo'><span>Width:</span><div style={{color: "lime"}}>{width}px</div></div>}
                {(width !== 64 && width !== 0) && <div className='iconmodal-imageinfo'><span>Width:</span><div style={{color: "red"}}>{width}px</div></div>}

                {(height === 64 && height !== 0) && <div className='iconmodal-imageinfo'><span>Height:</span><div style={{ color: "lime" }}>{height}px</div></div>}
                {(height !== 64 && height !== 0) && <div className='iconmodal-imageinfo'><span>Height:</span><div style={{ color: "red" }}>{height}px</div></div>}
                <form>
                    <Input onChange={handleFileSelect} id="contained-button-file" type="file" sx={{margin: "5px 0", width: "100%"}} />
        
                    <div className='iconmodal-menu-description'>De afbeelding moet 64x64 zijn!</div>
                    <Tooltip title={"Het icoon zal aangepast worden bij een restart"} disableInteractive placement='top'>
                        <Button 
                            onClick={handleChangeServericon} 
                            variant="contained" 
                            startIcon={<SearchIcon />}
                            sx={{
                                marginTop: '10px'
                            }}
                        >
                            Verander server icoon
                        </Button>
                    </Tooltip>
                </form>
            </div>
        </div>
    );
}
export default IconModal;