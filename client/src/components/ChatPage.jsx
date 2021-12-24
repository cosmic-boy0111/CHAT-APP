
import React,{useEffect,useState,useContext,useRef} from 'react'
import Search from './Search';
import {
    useHistory
} from 'react-router-dom'
import { userContext } from '../App'
import AlertDialogSlide from './LoginDialog';
import RegisterDialogSlide from './RegisterDialog';
// import ChatScreen from './ChatScreen';
import UserDetails from './UserDetails';
import Chat from'./Chat';
import { IconButton } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Fab from '@material-ui/core/Fab';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import Chart from './Chart';
import Polar from './Polar'
import Skeleton from '@mui/material/Skeleton';
import edt from '../icons/icons8-pencil-drawing-48.png'
import gsap from 'gsap'
import { Power3 } from 'gsap/all'

const ChatPage = () => {

    const {setOpen,rootUser,setChatUser,open,open2,edit, setEdit}  = useContext(userContext);

    const history = useHistory()
    let {wid} = useRef(null)
 
    const getData = async () =>{
        try {
            const res2 = await fetch('/getdata',{
                method:'GET',
                headers:{
                    "Content-Type":"application/json"
                }
            })
    
            const Data = await res2.json();
            setChatUser(Data)
        } catch (error) {
            console.log('data not found');
            // history.push('/login')
            setOpen(true)
        }
    }

    useEffect(() => {
        getData();
    }, [])

   
    const doThat = () =>{
        setEdit(!edit);
    }

    return (
        <>
            <AlertDialogSlide />
            <RegisterDialogSlide />
            <div className="main_body">
                <div className='body_container' style={{
                    filter:open || open2 ? 'blur(3px)':'none',
                }}> 
                    <div className='all_users' style={{
                        width:edit?'52%':'30%'
                    }}
                        ref = {el => wid=el}
                    >
                        <h2 className='marg'>WECHAT</h2>
                        <div style={{
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}
                        className='before_user'
                        >
                        <h3 
                        style={{
                            // padding:'.5rem 1rem',
                            cursor:'pointer',
                            display:'flex',
                            // justifyContent:'space-between',
                            width:'100%'
                        }}
                        className="after_marg user"
                        >
                            <div style={{
                                display:Object.keys(rootUser).length === 0?'none':'flex',
                                alignItems:'center'
                            }}>
                                <img src={rootUser.img===""?`https://avatars.dicebear.com/api/identicon/${rootUser.email}.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900`:rootUser.img} alt="img" 
                                    onClick={()=>setChatUser(rootUser)}
                                />
                                <span onClick={()=>setChatUser(rootUser)}>

                                    {rootUser.name}
                                </span>
                            </div>
                            <div style={{
                                display:Object.keys(rootUser).length === 0?'flex':'none',
                                // justifyContent:'space-between',
                                width:'100%',
                                alignItems:'center'
                            }}>
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="text" width={100} height={25} style={{marginLeft:'1rem'}}/>
                            </div>
                        </h3>
                        <IconButton style={{
                            color:'white',
                            margin:'0 1rem',
                            display:rootUser.isAdmin?'inline':'none'
                        }}
                        onClick={doThat}
                        >
                            {/* <EditRoundedIcon fontSize='small'/> */}
                            <img src={edt} alt="" srcset="" className='icon_size'/>
                        </IconButton>
                        </div>
                        <Search />
                    </div>
                    <div style={{
                        // backgroundColor:'white',
                        display:edit?'flex':'none',
                        flexDirection:'column',
                        justifyContent:'space-between',

                        width:'25%',
                        zIndex:'100'
                    
                    }}>
                        <div style={{
                            height:'48%'
                        }}
                            className='chart'
                        >

                        <Chart />
                        <center> <h4>Messages count per Day</h4></center>
                        </div>
                        <div style={{
                            height:'48%'
                        }}
                            className='polar'
                        >
                            <Polar />
                        </div>
                    </div>
                    <Chat />
                    <UserDetails />
                </div>
            </div>
        </>
    )
}

export default ChatPage
