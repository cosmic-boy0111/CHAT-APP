import React,{useContext} from 'react'
import { userContext } from '../App'
import { Avatar } from '@material-ui/core'
import { IconButton } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import del from '../icons/icons8-delete (1).svg'

const User = ({obj}) => {

    const { setChatUser,chatUser,edit,setShowData,countPolar, setCountPolar }  = useContext(userContext);
    const set = () =>{
        console.log('setting chat user');
        setChatUser(obj);
        console.log(chatUser);
    }

    const deleteUser = async (id) =>{
        if(!window.confirm("delete user")){
            
            return ;
        }else{
            try {

            
                setShowData((pre)=>{
                    return pre.filter((e) => e._id!==id)
                })

                countPolar[0] = countPolar[0]+1;
                setCountPolar(countPolar)

                const res = await fetch('/deleteUser',{
                    method:'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        id
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

                //   if(res.status === 200){
                //     alert('user delete')
                // }
            
                  

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
        <div style={{
                            display:'flex',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}
                        className='before_user'
                        >
            <div className="user" onClick={set}>
                <img src={obj.img===""?`https://avatars.dicebear.com/api/identicon/${obj.email}.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900`:obj.img} alt="img" style={{
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
                <Tooltip title="delete" placement="left">
                <IconButton style={{
                    color:'#8e24aa'
                }}
                onClick={()=>deleteUser(obj._id)}
                >
                    {/* <DeleteIcon /> */}
                    <img src={del} alt="" srcset="" className='icon_size'/>
                </IconButton>
                </Tooltip>
            </div>
            </div>
        </>
    )
}

export default User
