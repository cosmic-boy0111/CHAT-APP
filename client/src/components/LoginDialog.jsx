import React,{useContext,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {userContext} from '../App'
import logo from '../images/undraw_unlock_-24-mb.svg'
import { useHistory } from 'react-router-dom'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';

import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import io from 'socket.io-client'
import Forgot from './Forgot';


import eml from '../icons/icons8-envelope-48.png'
import loc from '../icons/icons8-lock.svg'
import ky from '../icons/icons8-key-2-48.png'
import Progress from './Progress'

const socket = io.connect("http://localhost:5000");
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AlertDialogSlide() {

    const { open,setOpen,setOpen2,setIsAdmin,adminKey,setEdit} = useContext(userContext)
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [email2, setEmail2] = useState('')
    const [password2, setPassword2] = useState('')
    const [key, setKey] = useState('')
    const [prog, setProg] = useState(false)

    const [forgot, setForgot] = useState(false)

    const loginUser = async (e) =>{

        if(email==='' || password===''){
          alert('invalid ')
        }
        e.preventDefault();

        try {
          setProg(true);
        // alert('res')
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,password
            })
    
        })
        const res2 = await fetch('/isAd',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            email : email,
            isAd : false
          })
        })

        const data = await res.json();
    
        setProg(false);
        if(res.status === 400 || res2.status===400 || !data){
            window.alert('invalid credentials');
            console.log('invalid credentials');
        }else{
            window.alert('user sign in successfully');
            console.log('user sign in successfully');
            setEdit(false)
            // history.push('/')
            setOpen(false)
        
        }
      } catch (error) {
          console.log(error);
          alert('invalid credentials');
      }
    
    }

    // modified

    const loginUser2 = async (e) =>{

        
        e.preventDefault();

        if(key===adminKey){
          setIsAdmin(true);
        }else{
          return alert('login failed, contact admin')
        }
        
        try {
          setProg(true);
          const res2 = await fetch('/isAd',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              email : email2,
              isAd : true
            })
          })
          
        
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email : email2,
                password : password2
            })
    
        })

        const data = await res.json();
    
        setProg(false)
        if(res.status === 400 || res2.status===400 || !data){
            window.alert('invalid credentials');
            console.log('invalid credentials');
        }else{
            // window.alert('user sign in successfully');
            console.log('user sign in successfully');
            // history.push('/')
            setOpen(false)
        
        }
      } catch (error) {
        // alert('invalid credentials');
          console.log(error);
      }
    
    }

  const goToRegister = () =>{
    setOpen(false)
    setOpen2(true)
  }


  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <div style={{
              display:prog?'block':'none'
            }}>
              <Progress />

            </div>
            <div style={{
                    display:forgot? 'inline' : 'none',
                    position:'absolute',
                    float:'right',
                    right:'0'
            }}>

            <IconButton onClick={()=>setForgot(false)}>
                <ClearRoundedIcon />
            </IconButton>
            </div>
          <DialogContentText id="alert-dialog-slide-description">
            <div className='dialog_container' style={{
              display: forgot ? 'flex' : 'none'
            }}>
              <Forgot setForgot={setForgot}/>
            </div>
            <div className='dialog_container' style={{
              display: forgot ? 'none' : 'flex'
            }}>
                <div className='first_dia_container2'>
                    <div className='first_dia_container2_div1'>

                    <h1>Login</h1>
                    <p>Log in to WECHAT and chat with peoples</p>
                    </div>
                    <div className='extra_circle'>

                    </div>
                    <img src={logo} alt="img" style={{
                      // marginTop:'2rem'  
                    }}/>
                    
                </div>
                <div className='second_dia_container'>
                <h3 style={{
                  margin:'.5rem 0'
                }}>Login as a User</h3>
                <form className="form_container" method="POST" onSubmit={loginUser}>
                  <div className="form_field" style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="email" class="form-label">
                      
                      {/* <EmailRoundedIcon /> */}
                      <img src={eml} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      autoComplete="off"
                      name='email'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      required='true'
                    />
                  </div>

                  <div className="form_field " style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="password" class="form-label">
                      
                      {/* <LockOpenOutlinedIcon /> */}
                      <img src={loc} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      required='true'
                      type="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      name='password'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <span  onClick={()=>setForgot(true)} style={{
                    color:'rgb(14, 122, 239)',
                    display: 'block',
                    float:'right',
                    cursor:'pointer',
                    textDecoration:'underline'
                  }}>Forgot Password?</span>
                  <Button variant="contained" color="primary" type='submit' style={{
                    // margin:'3rem 0'
                  }}>
                    login
                  </Button>
                </form>
                <h3 style={{
                  margin:'.5rem 0'
                }}>Login as an Admin</h3>
                {/* modified */}
                <form className="form_container" method="POST" onSubmit={loginUser2}>
                  <div className="form_field" style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="email" class="form-label">
                      
                      {/* <EmailRoundedIcon /> */}
                      <img src={eml} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      required='true'
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      autoComplete="off"
                      name='email'
                      value={email2}
                      onChange={(e)=>setEmail2(e.target.value)}
                    />
                  </div>

                  <div className="form_field " style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="password" class="form-label">
                      
                      {/* <LockOpenOutlinedIcon /> */}
                      <img src={loc} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      required='true'
                      type="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      name='password'
                      value={password2}
                      onChange={(e)=>setPassword2(e.target.value)}
                    />
                  </div>
                  <div className="form_field " style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="password" class="form-label">
                      
                      {/* <VpnKeyRoundedIcon /> */}
                      <img src={ky} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      required='true'
                      type="password"
                      id="password"
                      placeholder="Admin Key"
                      autoComplete="off"
                      name='password'
                      value={key}
                      onChange={(e)=>setKey(e.target.value)}
                    />
                  </div>
                  <span onClick={()=>setForgot(true)} style={{
                    color:'rgb(14, 122, 239)',
                    display: 'block',
                    float:'right',
                    cursor:'pointer',
                    textDecoration:'underline'
                  }}>Forgot Password?</span>
                  <Button variant="contained" color="secondary" type='submit' style={{
                    // margin:'3rem 0'
                  }}>
                    login
                  </Button>
                </form>
                  <p className='new' onClick={goToRegister} style={{
                    color:'rgb(14, 122, 239)',
                    margin:'.5rem 0'
                  }}>New To WECHAT, Register Here</p>
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
