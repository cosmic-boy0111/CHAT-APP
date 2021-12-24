import React,{useEffect,useState,useContext} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import User from './User';
import NewU from './NewU';
import { userContext } from '../App'
import Skeleton from '@mui/material/Skeleton';
import srh from '../icons/icons8-search.svg'

const Search = () => {

    const {users,setShowData,showData,newU, setNewU,setUsers,newUsers, setNewUsers,edit,showUsers} = useContext(userContext)
    
    const [find, setFind] = useState('')
    // const [showMe, setShowMe] = useState(true)
    
    const show = (text) =>{
        setFind(text)
        if(text===''){
            setShowData(users);
            setNewU(newUsers)
            return;
        }

        var newUser = []
        var newUser2 = []

        newUsers.forEach(e=>{
            if(e.name.toLowerCase().includes(text.toLowerCase())){
                newUser2.push(e);
            }
        })

        // console.log(newUsers);

        setNewU(newUser2);

        users.forEach(e=>{
            if(e.name.toLowerCase().includes(text.toLowerCase())){
                newUser.push(e);
            }
        })

        setShowData(newUser)
    }

    const submit = (e) =>{
        e.preventDefault();
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowMe(false)
    //     }, 4000);
    // }, [])

    return (
        <div style={{
            height:'73%',
        }}>
            <form className='search_form' onSubmit={submit}> 
                {/* <SearchIcon /> */}
                <img src={srh} alt="" srcset="" className='icon_size'/>
                <input type="text" placeholder='Search user here..' autoComplete='off' value={find} onChange={(e)=>show(e.target.value)}/>
            </form>
            {/* style={{
                display: (showData.length===0 && newU.length === 0) ?'none':'block'
            }} */}
            <div className='users_div' id='users_div' >
                <h4 className='user_heading' style={{
                    display:edit && newU.length !==0 ?'inline':'none'
                }}>New Users</h4>
                <div style={{
                    display:edit?'block':'none'
                }}>

                    {
                        newU.map(e =>{
                            return <NewU obj={e}/>
                        })
                    }
                </div>
                <h4 className='user_heading' style={{
                    display:(showData.length===0)?'none':'inline'
                }}>Users</h4>
                {
                    showData.map(e =>{
                        return <User obj={e}/>
                    })
                    
                }
            </div>
            <div className='users_div' id='users_div' style={{
                display: showUsers ?'none':'block'
            }}>
                <h4 className='user_heading' style={{
                }}>Users</h4>

                <div className="user" style={{
                    margin:'.5rem 1rem',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 5px 15px 0px',
                    borderRadius:'10px'
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{
                        marginLeft:'.5rem',
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <Skeleton variant="text" width={100} height={25} />
                        <Skeleton variant="text" width={150} height={20} />
                    </div>
                </div>
                <div className="user" style={{
                    margin:'.5rem 1rem',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 5px 15px 0px',
                    borderRadius:'10px'
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{
                        marginLeft:'.5rem',
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <Skeleton variant="text" width={100} height={25} />
                        <Skeleton variant="text" width={150} height={20} />
                    </div>
                </div>
                <div className="user" style={{
                    margin:'.5rem 1rem',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 5px 15px 0px',
                    borderRadius:'10px'
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{
                        marginLeft:'.5rem',
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <Skeleton variant="text" width={100} height={25} />
                        <Skeleton variant="text" width={150} height={20} />
                    </div>
                </div>
                <div className="user" style={{
                    margin:'.5rem 1rem',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 5px 15px 0px',
                    borderRadius:'10px'
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{
                        marginLeft:'.5rem',
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <Skeleton variant="text" width={100} height={25} />
                        <Skeleton variant="text" width={150} height={20} />
                    </div>
                </div>
                <div className="user" style={{
                    margin:'.5rem 1rem',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 5px 15px 0px',
                    borderRadius:'10px'
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{
                        marginLeft:'.5rem',
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <Skeleton variant="text" width={100} height={25} />
                        <Skeleton variant="text" width={150} height={20} />
                    </div>
                </div>
                <div className="user" style={{
                    margin:'.5rem 1rem',
                    boxShadow: 'rgb(0 0 0 / 15%) 0px 5px 15px 0px',
                    borderRadius:'10px'
                }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <div style={{
                        marginLeft:'.5rem',
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <Skeleton variant="text" width={100} height={25} />
                        <Skeleton variant="text" width={150} height={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
