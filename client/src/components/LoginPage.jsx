import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {


    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) =>{
        e.preventDefault();
        try {
          
        
        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,password
            })
    
        })
    
        const data = res.json();
    
        if(res.status === 400 || !data){
            window.alert('invalid credentials');
            console.log('invalid credentials');
        }else{
            window.alert('user sign in successfully');
            console.log('user sign in successfully');
            history.push('/')
        
        }
      } catch (error) {
          console.log(error);
      }
    
      }
    return (
        <div className='main_login'>
            <div className="body_login">
                <form onSubmit={loginUser}>
                    <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button type='submit'>submit</button>
                </form>
                <div className='login_first'>

                </div>
                <div className="login_second">

                </div>
                
            </div>
        </div>
    )
}

export default LoginPage
