import React,{useContext,useState,useEffect} from 'react'
import { userContext } from '../App'
import StayCurrentPortraitOutlinedIcon from '@material-ui/icons/StayCurrentPortraitOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneIphone from '@material-ui/icons/PhoneIphone';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Demo from './Crop';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { Tooltip } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormDialog from './EditForm';
import lout from '../icons/icons8-logout-48.png'
import del from '../icons/icons8-trash.svg'
import edt from '../icons/icons8-edit.svg'
import phn from '../icons/icons8-phone-48.png'
import eml from '../icons/icons8-envelope-48.png'

import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));
const UserDetails = () => {
    const classes = useStyles();

    const { chatUser,rootUser,setOpen,open3, setOpen3} = useContext(userContext)
    const logo = 'https://static.thenounproject.com/png/1743560-200.png'

    const [pic, setPic] = useState('')


    useEffect(() => {
        setPic(chatUser.img)
    }, [chatUser])

    const add = async (img) => {
        try {
            // console.log(img);
            const res = await fetch('/addimg',{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    img
                })
            })
            // setPic(img);
            const data = await res.json()
            if(!data){
                alert('not send');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logoutMe = async () => {
        try {
            const res = await fetch('/logout',{
                method:'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            // dispatch({type:'USER',payload:false})
            const data = await res.json();
            console.log(data);
            setOpen(true)
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async() => {
        if(!window.confirm("are you sure?")){ 
            return ;
        }
        try {
            const id = rootUser._id;
            const res = await fetch('/deleteUser',{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    id
                })
            })

            setOpen(true);
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <>
            <FormDialog />
            <div className='user_details' >
                <div className="user_data" style={{
                    display:Object.keys(chatUser).length === 0?'none':'flex',
                }}>
                    <div className='first_details'>
                        <img src={pic ===""?`https://avatars.dicebear.com/api/identicon/${chatUser.email}.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900`: pic} style={{
                            width:'150px'
                        }}/>
                        <h3>{chatUser.name}</h3>
                        <div style={{
                            display:chatUser.email===rootUser.email?'flex':'none',
                            justifyContent:'space-around',
                            alignItems:'center',
                            width:'100%'
                        }}>
                            <Tooltip title="Logout" aria-label="add"> 
                                <IconButton color='primary' onClick={logoutMe}>
                                    {/* <ExitToAppRoundedIcon /> */}
                                    <img src={lout} alt="" srcset="" className='icon_size' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Account" aria-label="add"> 
                                <IconButton color='primary' onClick={deleteUser} >
                                    {/* <DeleteRoundedIcon /> */}
                                    <img src={del} alt="" srcset="" className='icon_size' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Profile" aria-label="add"> 
                                <IconButton color='primary' onClick={()=>setOpen3(true)}>
                                    {/* <EditRoundedIcon /> */}
                                    <img src={edt} alt="" srcset="" className='icon_size' />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='second_details'>
                        <p> 
                            {/* <PhoneIphone fontSize='small'/> */}
                            <img src={phn} alt="" srcset="" className='icon_size'/> 
                        <span style={{ marginLeft:'.5rem',overflowWrap:'anywhere' }}>{chatUser.phone} </span></p>
                        <p> 
                            {/* <EmailOutlinedIcon fontSize='small'/>  */}
                            <img src={eml} alt="" srcset="" className='icon_size'/>
                        <span style={{ marginLeft:'.5rem',overflowWrap:'anywhere' }}>{chatUser.email} </span></p>
                    </div>
                </div>
                <div className="user_data" style={{
                    display:Object.keys(chatUser).length === 0?'flex':'none',

                }}>
                    <div className='first_details'>
                        <Skeleton variant="circular" width={150} height={150} />
                        <Skeleton variant="text" width={100} height={30} style={{
                            margin:'1rem 0'
                        }}/>
                        <div style={{
                            display:chatUser.email===rootUser.email?'flex':'none',
                            justifyContent:'space-around',
                            alignItems:'center',
                            width:'100%'
                        }}>
                            <Skeleton variant="circular" width={30} height={30} />
                            <Skeleton variant="circular" width={30} height={30} />
                            <Skeleton variant="circular" width={30} height={30} />
                        </div>
                    </div>
                    <div className='second_details' style={{
                        display:'block'
                    }}>
                        <p ><Skeleton variant="circular" width={30} height={30} /> <Skeleton variant="text" width={100} height={30} style={{marginLeft:'1rem'}} /></p>
                        <p ><Skeleton variant="circular" width={30} height={30} /> <Skeleton variant="text" width={100} height={30} style={{marginLeft:'1rem'}} /></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails
