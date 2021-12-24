import React,{useContext,useState} from 'react';
import { userContext } from '../App';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import { width } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
const Input = styled('input')({
    display: 'none',
});
const CropImg = ({setImg}) => {

    const {open4,setOpen4,rootUser,setChatUser,chatUser, setRootUser} = useContext(userContext);
    const [srcImg, setSrcImg] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({aspect: 50 / 50});
    const [result, setResult] = useState(null);

    const handleImage = async (event) => {
        setSrcImg(URL.createObjectURL(event.target.files[0]));
        console.log(event.target.files[0]);
    };

    const getCroppedImg = async () => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg", 1);
            setResult(base64Image);
            setImg(base64Image);
            setOpen4(false)
            
            setRootUser({...rootUser,'img' : base64Image})
            console.log(rootUser);

            setChatUser({...chatUser,'img':base64Image});

            const res = await fetch('/addimg',{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    img : base64Image
                })
            })
            // setPic(img);
            const data = await res.json()
            if(!data){
                alert('not send');
            }
        } catch (e) {
            console.log("crop the image");
            console.log(e);
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(result);
    // }

    return (
        <div style={{
            display:open4?'flex':'none',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            marginTop:'.5rem'
        }}>
            
            <div style={{
                display:srcImg===null?'none':'block'
            }}>
                {srcImg && (
                    <div style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <ReactCrop
                            style={{maxWidth: "50%"}}
                            src={srcImg}
                            onImageLoaded={setImage}
                            crop={crop}
                            onChange={setCrop}
                        />
                        
                    </div>
                )}
                
            </div>
            <div style={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%'
            }}>

            
            <label htmlFor="icon-button-file" >
                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImage}/>
                <Tooltip title="Choose Image">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </Tooltip>
            </label>
            <Button variant="outlined" size="small" onClick={()=>setOpen4(!open4)} style={{
                marginTop:'.5rem',
                display:srcImg===null?'none':'block'
              }}
              onClick={getCroppedImg}
            >
                Crop
            </Button>
            </div>
        </div>
    )
}

export default CropImg
