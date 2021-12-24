/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import React, { useState, useEffect, useContext } from "react";

import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import { IconButton } from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import io from "socket.io-client";
import { userContext } from "../App";
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Emoji from "./Emoji";
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Skeleton from '@mui/material/Skeleton';
import emj from '../icons/icons8-emoji-32.png'
import sent from '../icons/icons8-sent-48 (1).png'


const socket = io.connect("http://localhost:5000");

const Chat = () => {


  const { chatUser, rootUser, setChatUser,edit,countMe, setCountMe } = useContext(userContext);
  const logo = 'https://static.thenounproject.com/png/1743560-200.png'

  const [message, setMessage] = useState([]);
  const [temp, setTemp] = useState("");
  const [chat, setChat] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(false);

  const sendChat = async (e) => {
    e.preventDefault();
    // console.log(countMe);
    // console.log(data);
    
    if (message === "") {
      setShow(false)
      return;
    }

    try {

      

      const res = await fetch("/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email:rootUser.email,
          message: message,
          name:rootUser.name,
          img:rootUser.img
        }),
      });

      if (res.status !== 200) {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("message send");
    socket.emit("message", { message, email: rootUser.email,name:rootUser.name,img:rootUser.img });
    setTemp(message);
    setMessage("");
    setShow(false)
    document.getElementById('emoji').style.display = 'none'

      var d = new Date();
      var n = d.getDay()

      const res1 = await fetch('/addCount',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email:rootUser.email,
          count : countMe,
          idx : n
        })
      })

      countMe[n] = countMe[n]+1;

      setCountMe(countMe);
    
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/getMessage", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        console.log(data);
        
        setChat(data.reverse());
        setTimeout(() => {
          setMsg(true);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([{ message: payload.message, email: payload.email,name:payload.name,img:payload.img }, ...chat]);
      
    });
    return () => {
      socket.off("message");
    };
  }, [chat]);

  const doThis = () =>{
    setShow(true)
    // document.querySelector(".emoji-picker-react").style.height ='320px !important'
    document.getElementById('emoji').style.display = 'inline'
  }
  const doThis2 = () =>{
    setShow(!show)
    document.getElementById('emoji').style.display = 'none'
  }

  return (
    <div className="chat_screen" style={{
      display:edit?'none':'flex'
      // width:edit?'0%':'47%'
    }}>
      <div className="chat_screen_header" style={{
        backgroundColor:'rgba(255, 255, 255, 0.12)'
      }}>
        <h3>WECHAT ROOM</h3>
        <div className="calling">
          <IconButton
            style={{
              color: "rgb(14, 122, 239)",
            }}
          >
            <PhoneOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            style={{
              color: "rgb(14, 122, 239)",
            }}
          >
            <VideocamOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="chat_body_main">
        <div className="chat_body" id="chat_body" style={{
          display: msg ?'flex':'none'
        }}>
            {
                chat.map(e=>{
                    return(
                        <div style={{
                            // border:'2px solid red',
                            padding:'.5rem 1rem',
                            width:'100%',
                            
                        }}
                        className='all_chat'
                        >
                            <div style={{
                                maxWidth:'70%',
                                // border:'3px solid green',
                                float:e.email===rootUser.email?'right':'left',
                                display:'flex',
                                flexDirection:e.email===rootUser.email?'row':'row-reverse',
                                alignItems:'center',
                            }}>
                                <div style={{
                                    backgroundColor:e.email===rootUser.email?'#0e7aef':'#f1f3f4',
                                    color:e.email===rootUser.email?'white':'black',
                                    padding:'0.3rem 1rem',
                                    position:'relative',
                                    bottom:'1.5rem',
                                    // overflowWrap: 'anywhere',
                                    borderTopLeftRadius:'5px',
                                    borderTopRightRadius:'5px',
                                    fontWeight:'bold',
                                    borderBottomLeftRadius:e.email===rootUser.email?'5px':'0',
                                    borderBottomRightRadius:e.email===rootUser.email?'0':'5px',
                                    display:'flex',
                                    flexDirection:'column',
                                    left:e.email!==rootUser.email?'.5rem':'-0.5rem',
                                    width:'90%',
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                }}>
                                    <p style={{
                                        fontSize:'10px',
                                        // maxWidth:'10%',
                                        height:'14px',
                                        // overflowWrap: 'normal',
                                        overflow:'hidden',
                                        color:e.email!==rootUser.email?'#536DFE':'cyan'
                                    }}>{e.name}</p>
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        width:'100%'
                                    }}>
                                    <p style={{
                                        overflowWrap: 'anywhere',
                                        width:'100%',
                                        fontWeight:'initial'
                                    }} >{ e.message}</p>
                                    </div>
                                </div>
                                <img src={e.img===""?`https://avatars.dicebear.com/api/identicon/${e.email}.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900`:e.img} alt="" style={{
                                  width:'30px'  ,
                                  alignSelf:'end',
                                  borderRadius:'50%',
                                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                  // height:'30px'
                                }}/>
                                {/* <Avatar alt="Remy Sharp" src={logo} /> */}

                            </div>

                        </div>
                    )
                })
            }
        </div>
        <div className="chat_body" id="chat_body" style={{
          display: msg?'none':'flex'
        }}>
          <div style={{
            display:'flex',
            flexDirection:'row-reverse',
            alignSelf:'end',
            width:'60%',
            padding:'0.5rem 1rem',
            justifyContent:'space-between'
          }}>
            <Skeleton variant="circular" width={30} height={30} style={{
              alignSelf:'end',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }} />
            <Skeleton variant="rectangular" width={220} height={50} style={{
              position:'relative',
              bottom:'1.5rem',
              right:'.5rem',
              borderRadius: '5px 5px 0 5px' ,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}/>
          </div>
          <div style={{
            display:'flex',
            width:'60%',
            padding:'0.5rem 1rem',
            justifyContent:'space-between'
          }}>
            <Skeleton variant="circular" width={30} height={30} style={{
              alignSelf:'end',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }} />
            <Skeleton variant="rectangular" width={220} height={50} style={{
              position:'relative',
              bottom:'1.5rem',
              left:'.5rem',
              borderRadius: '5px 5px 5px 0px' ,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}/>
          </div>
          <div style={{
            display:'flex',
            flexDirection:'row-reverse',
            alignSelf:'end',
            width:'60%',
            padding:'0.5rem 1rem',
            justifyContent:'space-between'
          }}>
            <Skeleton variant="circular" width={30} height={30} style={{
              alignSelf:'end',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }} />
            <Skeleton variant="rectangular" width={220} height={50} style={{
              position:'relative',
              bottom:'1.5rem',
              right:'.5rem',
              borderRadius: '5px 5px 0px 5px' ,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}/>
          </div>
          <div style={{
            display:'flex',
            flexDirection:'row-reverse',
            alignSelf:'end',
            width:'60%',
            padding:'0.5rem 1rem',
            justifyContent:'space-between'
          }}>
            <Skeleton variant="circular" width={30} height={30} style={{
              alignSelf:'end',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }} />
            <Skeleton variant="rectangular" width={220} height={50} style={{
              position:'relative',
              bottom:'1.5rem',
              right:'.5rem',
              borderRadius: '5px 5px 0px 5px' ,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}/>
          </div>
          <div style={{
            display:'flex',
            width:'60%',
            padding:'0.5rem 1rem',
            justifyContent:'space-between'
          }}>
            <Skeleton variant="circular" width={30} height={30} style={{
              alignSelf:'end',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }} />
            <Skeleton variant="rectangular" width={220} height={50} style={{
              position:'relative',
              bottom:'1.5rem',
              left:'.5rem',
              borderRadius: '5px 5px 5px 0px' ,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}/>
          </div>
          <div style={{
            display:'flex',
            width:'60%',
            padding:'0.5rem 1rem',
            justifyContent:'space-between'
          }}>
            <Skeleton variant="circular" width={30} height={30} style={{
              alignSelf:'end',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }} />
            <Skeleton variant="rectangular" width={220} height={50} style={{
              position:'relative',
              bottom:'1.5rem',
              left:'.5rem',
              borderRadius: '5px 5px 5px 0px' ,
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}/>
          </div>
        </div>
        <div>
        <Emoji show={show} setMessage={setMessage}/>
        
        <form id="footer" onSubmit={sendChat}>
          <input 
          type="text" 
          placeholder="Type your message here..."
          className="text_area"
          value={message}
          // id="text_area"
          onChange={(e) => setMessage(e.target.value)}  
          />
          {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='message_input' placeholder="Type you message here..."/> */}
          <div>
            <IconButton
              style={{
                color: "rgb(14, 122, 239)",
                display:show?'inline':'none'
              }}
              // type='submit'
              onClick={doThis2}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
              style={{
                color: "rgb(14, 122, 239)",
                display:show?'none':'inline'
              }}
              onClick={doThis}
          
            >
              {/* <EmojiEmotionsIcon fontSize="small" /> */}
              <img src={emj} alt="" srcset="" className='icon_size'/>
            </IconButton>
             
            <IconButton
              style={{
                color: "rgb(14, 122, 239)",
              }}
              type='submit'
              // onClick={sendChat}
            >
              {/* <SendRoundedIcon fontSize="small" /> */}
              <img src={sent} alt="" srcset="" className='icon_size'/>
            </IconButton>
          </div>
          
        </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
