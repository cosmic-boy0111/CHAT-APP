import React,{useContext,useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userContext } from '../App';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CropImg from './CropImg';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import bcrypt from 'bcryptjs'
import CircularProgress from '@mui/material/CircularProgress';
import Forgot from './Forgot';
import Per from '../icons/icons8-customer-48.png'
import Phn from '../icons/icons8-phone-48.png'

const Input = styled('input')({
  display: 'none',
});
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const {open3, setOpen3, rootUser , chatUser, setRootUser, setChatUser , open4, setOpen4} = useContext(userContext);

  const [show, setShow] = useState(false)

  const [img, setImg] = useState(rootUser.img)
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState('')
  const [err2, setErr2] = useState(false)
  const [errText2, setErrText2] = useState('')
  const [progress, setProgress] = useState(false)
  const [forgot, setForgot] = useState(false)
  
  const [user, setUser] = useState({});
  const [pass, setPass] = useState({
    old : '',
    new : '',
    confirm : ''
  })

  useEffect(() => {
    console.log(rootUser);
    setUser(rootUser);
    setImg(rootUser.img)
  }, [open3])


  const handleInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    if((name==='phone' && /^\d+$/.test(value)!==true && value!=='') || (name==='phone' && value.length > 10)){
      return;
    }
    setUser({ ...user, [name]: value });
  };

  const handlePass = (e) =>{
    var name = e.target.name;
    var value = e.target.value;

    setPass({...pass, [name]: value});
    // console.log(pass);
    if(pass.old === '' && pass.new === '' && pass.confirm === ''){
      setErr(false);
      setErrText('');
    }

  }

  const updateData = async(e) =>{
    e.preventDefault();
    if(pass.old === '' && pass.new === '' && pass.confirm === ''){
      // setUser({...user})
      // setRootUser(user)
      // setChatUser(user)
      setErr(false)
      try {
        setProgress(true);
        const res = await fetch('/updateUser2',{
          method: 'POST',
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            id : user._id,
            name: user.name,
            email : user.email,
            phone : user.phone,
          })
        })
        console.log(res);
        if(res.status !== 200){
          console.log('not update');
          setErr(true);
          setErrText('user already exits')
          setProgress(false)
        }else{
          console.log('update');
          setProgress(false)
          setOpen3(false)
        }
      } catch (error) {
        console.log('not update');
      }

    }else{
      const isMatch = await bcrypt.compare(pass.old, user.password);
      if(!isMatch){
        setErr(true)
        setErrText( <span> Old password not match <span onClick={()=>setForgot(true)} style={{
          color:'rgb(14, 122, 239)',
          display: 'block',
          float:'right',
          cursor:'pointer',
          textDecoration:'underline'
        }}>Forgot Password?</span> </span>)
        return;
      }
      if(pass.new !== pass.confirm){
        setErr(true)
        setErrText('new and confirm password not match')
        return;
      }
  
      if(pass.new.length < 5){
        setErr(true)
        setErrText('Password size must be greater than or equal to 5')
        return;
      }

      // setUser({...user,'password' : pass.new, 'cpassword' : pass.confirm})
      
      setErr(false)
    
      setRootUser(user);
      setChatUser(user);

      console.log(pass);
      try {
        setProgress(true);
        const res = await fetch('/updateUser',{
          method: 'POST',
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            id : user._id,
            img:img,
            name: user.name,
            email : user.email,
            phone : user.phone,
            password : pass.new ,
            cpassword : pass.confirm
          })
        })
        
      //   const res2 = await fetch('/getdata',{
      //     method:'GET',
      //     headers:{
      //         "Content-Type":"application/json"
      //     }
      // })

      // const Data = await res2.json();
      // setRootUser({...rootUser,'img' : img});
      // setChatUser({...chatUser,'img' : img});

      // const res2 = await fetch('/addimg',{
      //     method:'POST',
      //     headers: {
      //         "Content-Type":"application/json"
      //     },
      //     body: JSON.stringify({
      //         img : img
      //     })
      // })

        console.log(res);
        if(res.status !== 200){
          console.log('not update');
          setErr(true);
          setErrText('user already exits')
          setProgress(false)
        }else{
          console.log('update');
          setProgress(false);
          setOpen3(false)
        }
      } catch (error) {
        console.log('not update');
      }
        
    }
    
    

  }

  return (
    <div>
      <Dialog open={open3} >
        <DialogContent>
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
          <div style={{
            display:forgot? 'none' : 'inline',
                      position:'absolute',
                      float:'right',
                      right:'0'
          }}>

          <IconButton onClick={()=>setOpen3(false)}>
              <ClearRoundedIcon />
          </IconButton>
          </div>
          <div className='edit_form' style={{
            display:forgot?'block':'none',
            width:'100%'
          }}>
              <Forgot setForgot={setForgot}/>
          </div>
          <div className='edit_form' style={{
            display:forgot?'none':'block'
          }}>
          <form onSubmit={updateData}>
            <div className="image_input">
              <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center'
              }}>
              <img src={img === '' ? `https://avatars.dicebear.com/api/identicon/${rootUser.email}.svg?b=%23c0bfbf&r=50&scale=99&colorLevel=900`:img} className='test_img'/>
              <Button variant="outlined" size="small" onClick={()=>setOpen4(!open4)} style={{
                marginTop:'.5rem'
              }}>
                Edit
              </Button>
              </div>
              <CropImg setImg={setImg}/>
            </div>
            <div className='input_field'>
            {/* <AccountCircleRoundedIcon className='input_icon'/> */}
            <img src={Per} alt="" srcset="" className='input_icon'/>
            <TextField
                margin="dense"
                id="name"
                name='name'
                label="Name"
                type="text"
                value={user.name}
                fullWidth
                variant="standard"
                required
                onChange={handleInputs}
            />
            </div>
            <div className='input_field'>
            {/* <CallRoundedIcon className='input_icon'/> */}
            <img src={Phn} alt="" srcset="" className='input_icon'/>
            <TextField
                margin="dense"
                id="number"
                name='phone'
                label="Phone Number"
                type="text"
                value={user.phone}
                fullWidth
                variant="standard"
                required
                onChange={handleInputs}
            />
            </div>
            {/* <p style={{
                 display:err?'inline':'none',
                 color:'rgb(244, 67, 54)',
                 fontSize:'13px',
                 fontWeight:'bold'
               }}> {errText}</p> */}
            <Button variant="outlined" className='change_pass' onClick={()=>setShow(!show)} >Change Password</Button>
            <div style={{
              display:show?'block':'none'
            }}>
               <p style={{
                 display:err?'inline':'none',
                 color:'rgb(244, 67, 54)',
                 fontSize:'13px',
                 fontWeight:'bold'
               }}> {errText}</p>
               <TextField
                margin="dense"
                id="oldPassword"
                name="old"
                label="Old Password"
                type="password"
                value={pass.old}
                fullWidth
                variant="standard"
                onChange={handlePass}
              />
               <TextField
                margin="dense"
                id="newPassword"
                name='new'
                value={pass.new}
                label="New Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handlePass}
              />
               <TextField
                margin="dense"
                id="confirmPassword"
                name='confirm'
                value={pass.confirm}
                label="Confirm Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={handlePass}
              />
            </div>
            <Button type='submit' variant="contained" className='change_pass'> {
              progress ? <CircularProgress color="inherit" style={{
                width:'23px',
                height:'23px'
              }} /> : 'Submit'
            } </Button>
            </form>
          </div>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
