import React,{useContext} from 'react'
import { userContext } from '../App'
import { Avatar } from '@material-ui/core'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { IconButton } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import chk from '../icons/icons8-check-all.svg'
import del from '../icons/icons8-cancel.svg'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NewU = ({obj}) => {

    const { setChatUser,chatUser,edit,setNewU,setShowData,countPolar, setCountPolar } = useContext(userContext)

    const set = () =>{
        console.log('setting chat user');
        setChatUser(obj);
        console.log(chatUser);
    }

    const deleteUser = async (id) =>{
        if(!window.confirm("Remove user")){
            return ;
        }
        try {
        
            setNewU((pre)=>{
                return pre.filter((e) => e._id!==id)
            })

            countPolar[2] = countPolar[2]+1;
            setCountPolar(countPolar)

            const res = await fetch('/deleteNewUser',{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                  },
                body: JSON.stringify({
                    id
                })
            })

            // if(res.status === 200){
            //     alert('user remove')
            // }
            const res1 = await fetch('/addPolar',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  count : countPolar,
                //   idx : 0
                })
              })



        } catch (error) {
            console.log(error);
        }
    }

    const AddUser = async (ob) =>{
        try {
        
            setNewU((pre)=>{
                return pre.filter((e) => e._id!==ob._id)
            })

            countPolar[1] = countPolar[1]+1;
            setCountPolar(countPolar)

            setShowData((pre)=>{
                return [...pre,ob];
            })

            const res = await fetch('/deleteNewUser',{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                  },
                body: JSON.stringify({
                    id : ob._id
                })
            })

            const res2 = await fetch('/register',{
                method: 'POST',
                headers: {
                  "Content-Type":"application/json"
                },
                body: JSON.stringify({
                  name : ob.name,
                  email : ob.email,
                  phone : ob.phone,
                  password : ob.password ,
                  cpassword : ob.cpassword,
                  secret_key : ob.secret_key
                })
              })

              const res1 = await fetch('/addPolar',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  count : countPolar,
                //   idx : 0
                })
              })




            // if(res.status === 200 && res2.status === 201){
            //     alert('user register')
            // }



        } catch (error) {
            console.log(error);
        }
    }

    const logo = 'https://static.thenounproject.com/png/1743560-200.png'
    return (
        <>
        <div style={{
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}
                        className='before_user'
                        >
            <div className="user" onClick={set} >
                <img src={`https://avatars.dicebear.com/api/identicon/${obj.email}.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900`} alt="img" style={{
                    border: obj.isAdmin ? '2px solid #f50057' : 'none'
                }}/>
                <p><span style={{
                    height:'1.5rem',
                    overflowY:'hidden'
                }}>{obj.name}</span> <p className='last_msg' style={{
                    overflowWrap:'anywhere'
                }}>{obj.email} </p></p>
            </div>
            <div style={{
                display:edit?'flex':'none',
                margin:'0 1rem',
                
            }}>
                <Tooltip title="confirm" placement="left">
                <IconButton style={{
                    color:'#00e676'
                }}
                onClick={()=>AddUser(obj)}
                >
                    {/* <CheckCircleIcon /> */}
                    <img src={chk} alt="" srcset="" className='icon_size'/>
                </IconButton>
                </Tooltip>
                <Tooltip title="cancel" placement="right">
                <IconButton style={{
                    color:'#8e24aa'
                }}
                onClick={()=>deleteUser(obj._id)}
                >
                    {/* <CancelRoundedIcon /> */}
                    <img src={del} alt="" srcset="" className='icon_size'/>
                </IconButton>
                </Tooltip>
            </div>
            </div>
        </>
    )
}

export default NewU