import React,{useState,useContext} from 'react'
import security from '../images/undraw_forgot_password_re_hxwm.svg'
import TextField from '@mui/material/TextField';
import { userContext } from '../App'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import bcrypt from 'bcryptjs'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
const Forgot = ({setForgot}) => {


    const [key, setKey] = useState('');
    const [email, setEmail] = useState('');
    const [circle, setCircle] = useState(false);
    const [isVerify, setIsVerify] = useState(false)
    const [err, setErr] = useState(false)
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [done, setDone] = useState(false)
    const [passErr, setPassErr] = useState('')


    const verify = async (e) =>{
        e.preventDefault();
        console.log(email);
        console.log(key);
        setCircle(true)
        try {
            setCircle(true)
            const res = await fetch('/getUser',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email : email,
                })
            })

            const data = await res.json();
            console.log(data);
            
            if(res.status === 201){
                setCircle(false)
                const isMatch = await bcrypt.compare(key, data.secret_key);
                if(isMatch){
                    console.log('match');
                    setIsVerify(true);
                    setErr(false)
                }else{
                    setErr(true)
                }
            }else{
                setCircle(false)
            }

        } catch (error) {
            console.log(error);
            setCircle(false);
            setErr(true);
        }

    }

    const submitData = async (e) => {
        e.preventDefault();

        if(password === '' || cpassword === ''){
            setPassErr('Enter Password');
            return;
        }else if(password !== cpassword){
            setCpassword('')
            setPassword('')
            setPassErr('Passwords not match');
            return;
        }
        setCircle(true)
        try {
            const res = await fetch('/getUser',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email : email,
                })
            })

            const data = await res.json();

            const res2 = await fetch('/updateUser3',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    id : data._id,
                    password : password,
                    cpassword : cpassword
                })
            })

            setCircle(false);
            setDone(true);
            setPassErr('')
            console.log('update');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        
        <div className='forgot_div'>
            <div className='forgot_container'>
                
                <h2>Forgot Password</h2>
                <img src={security} alt="" />
                <form onSubmit={ isVerify ? submitData : verify}>
                    <TextField
                        margin="dense"
                        id="email"
                        name='email'
                        label="Enter Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value = {email}
                        required
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="key"
                        name='key'
                        label="Enter Secret Key"
                        type="text"
                        fullWidth
                        variant="standard"
                        value = {key}
                        required
                        onChange={(e)=>setKey(e.target.value)}
                    />
                    <div style={{
                        display:err?'block':'none'
                        }}>
                        <p style={{
                            display:err?'inline':'none',
                            color:'rgb(244, 67, 54)',
                            fontSize:'13px',
                            fontWeight:'bold'
                        }}>secret key/email not match</p>
                    </div>
                    <div style={{
                        display:isVerify?'block':'none'
                    }}>
                        <TextField
                            margin="dense"
                            id="password"
                            name='password'
                            label="New Password"
                            type="Password"
                            fullWidth
                            value={password}
                            variant="standard"
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="confirmPassword"
                            name='confirmPassword'
                            label="Confirm Password"
                            type="Password"
                            fullWidth
                            value={cpassword}
                            variant="standard"
                            onChange={(e)=> setCpassword(e.target.value)}
                        />
                    </div>
                    <div style={{
                        display: passErr === '' ?'none':'block'
                        }}>
                        <p style={{
                            display: passErr==='' ?'none':'inline',
                            color:'rgb(244, 67, 54)',
                            fontSize:'13px',
                            fontWeight:'bold'
                        }}>{passErr}</p>
                    </div>
                    
                    {
                        done ? <div
                            style={{
                                width:'100%',
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center',
                                position:'relative'
                            }}
                        >  <CheckCircleOutlineRoundedIcon style={{
                            fontSize:'50px',
                            color:'#6C63FF',
                            
                        }} /> 
                            <p style={{
                                textDecoration:'underline',
                                color:'#6C63FF',
                                cursor:'pointer'
                            }} variant="outlined" onClick={()=>setForgot(false)} >All Set Login</p>
                        </div> : <Button type='submit' variant="contained" className='change_pass'>
                                        {
                                            circle? <FacebookCircularProgress style={{
                                                width:'23px',
                                                height:'23px'
                                            }}/> :'Submit'
                                        }
                                        </Button>
                    }
                    
                        
                    
                    
                </form>
            </div>
        </div>
        </>
    )
}

export default Forgot

