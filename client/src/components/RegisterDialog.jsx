import React,{useContext,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {userContext} from '../App'
import logo from '../images/undraw_secure_login_pdn4 (2).svg'
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

import usr from '../icons/icons8-customer-48.png'
import eml from '../icons/icons8-envelope-48.png'
import cll from '../icons/icons8-phone-48.png'
import loc from '../icons/icons8-lock.svg'
import ploc from '../icons/icons8-padlock.svg'
import shd from '../icons/icons8-user-shield-48.png'
import Progress from './Progress'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RegisterDialogSlide() {

    const { open2,setOpen2,setOpen} = useContext(userContext)
    const [prog, setProg] = useState(false)
    
    const [user, setUser] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
      secret_key : ''
    });
  
    let name, value;
  
    const handleInputs = (e) => {
      name = e.target.name;
      value = e.target.value;
      if(name==='phone' && /^\d+$/.test(value)!==true && value!==''){
        return;
      }
      setUser({ ...user, [name]: value });
      console.log(user);
    };
  
    const PostData = async (e) =>{
      e.preventDefault();
      if(user.password !== user.cpassword){
        alert('passwords not match')
        setUser({
          ...user,
          password:'',
          cpassword:''
        })
        return;
      }
      setProg(true);
      const {name,email,phone,password,cpassword,secret_key} = user;
      
      const res = await fetch('/newUser',{
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,email,phone,password,cpassword,secret_key
        })
      })
  
      const data = await res.json();
      setProg(false);
      if(res.status === 422 || !data){
        window.alert('INVALID REGISTRATION');
        console.log('registration failed');
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
          secret_key : ''
        });
      }else{
        window.alert(' REGISTRATION complete, You may log in when your request accepted');
        console.log('registration complete');
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
          secret_key : ''
        });
        setOpen(true)
        setOpen2(false)
      }
    }

  const goToLogin = () =>{
    setOpen(true)
    setOpen2(false)
  }

  return (
    <div>
      <Dialog
        open={open2}
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
          <DialogContentText id="alert-dialog-slide-description">
            <div className='dialog_container'>
                <div className='first_dia_container2'>
                    <div className='first_dia_container2_div1'>
                      <h1>Sign in</h1>
                      <p>Sign in to WECHAT and chat with peoples</p>
                    </div>
                    <div className='extra_circle'>

                    </div>
                    <img src={logo} alt="img" style={{
                      marginTop:'2rem'  
                    }}/>
                </div>
                <div className='second_dia_container'>
                <form method="POST" className="form_container" autocomplete="off" onSubmit={PostData}>
                  <div className="form_field">
                    <label for="name" class="form-label">
                      {/* <PersonIcon /> */}
                      <img src={usr} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      type="text"
                      id="name"
                      name='name'
                      onChange={handleInputs}
                      value={user.name}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form_field">
                    <label for="email" class="form-label">
                      {/* <EmailIcon /> */}
                      <img src={eml} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      type="email"
                      id="email"
                      name='email'
                      onChange={handleInputs}
                      value={user.email}
                      placeholder="Your Email"
                      required
                  
                    />
                  </div>
                  <div className="form_field ">
                    <label for="phone" class="form-label">
                      {/* <PhoneIphoneIcon /> */}
                      <img src={cll} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name='phone'
                      onChange={handleInputs}
                      value={user.phone}
                      minlength="10"
                      maxLength='10'
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  
                  <div className="form_field ">
                    <label for="password" class="form-label">
                      {/* <LockOpenIcon /> */}
                      <img src={ploc} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      type="password"
                      id="password"
                      name='password'
                      onChange={handleInputs}
                      value={user.password}
                      placeholder="Password"
                      minlength="5"
                      required
                    />
                  </div>
                  <div className="form_field ">
                    <label for="cpassword" class="form-label">
                      {/* <LockIcon /> */}
                      <img src={loc} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      type="password"
                      id="cpassword"
                      name='cpassword'
                      onChange={handleInputs}
                      value={user.cpassword}
                      placeholder="Confirm your Password"
                      required
                    />
                  </div>
                  <span style={{
                    color:'rgb(14, 122, 239)'
                  }}>Which thing makes you happy?</span>
                  
                  <span style={{
                    fontSize:'11px',
                    display:'block'
                  }}>Answer this question and it will be set as your <span style={{
                    color:'rgb(14, 122, 239)'
                  }}> SECRET KEY</span></span>

                  <div className="form_field">
                    <label for="name" class="form-label">
                      {/* <SecurityRoundedIcon /> */}
                      <img src={shd} alt="" srcset="" className='icon_size' />
                    </label>
                    <input
                      type="text"
                      id="secret_key"
                      name='secret_key'
                      onChange={handleInputs}
                      value={user.secret_key}
                      placeholder="Your Answer"
                      required
                    />
                  </div>
                  <Button variant="contained" color="primary" type='submit'  style={{
                    marginBottom:'1rem'
                  }}>
                    Register
                  </Button>
                  <p className='new' onClick={goToLogin} style={{
                    color:'rgb(14, 122, 239)',
                    display:'block'
                  }}>Already Register, Login</p>
                </form>
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
