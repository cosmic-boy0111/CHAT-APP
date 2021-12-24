

import React,{useEffect,useState,createContext} from 'react';
import './App.css';
import ChatPage from './components/ChatPage';
import {
  Route,
  BrowserRouter,
  Switch,
  useHistory
} from 'react-router-dom'

export const userContext = createContext();

const App = () =>{

  const [users, setUsers] = useState([])
  const [countMe, setCountMe] = useState([])
  const [countPolar, setCountPolar] = useState([])
  const [newUsers, setNewUsers] = useState([])
  const [rootUser, setRootUser] = useState({})
  const [showData, setShowData] = useState([])
  const [chatUser, setChatUser] = useState({})
  const [showUsers, setShowUsers] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  // modified
  const [adminKey, setAdminKey] = useState('hey');
  const [isAdmin, setIsAdmin] = useState(false)
  const [edit, setEdit] = useState(false)

  const [newU, setNewU] = useState([])

  const getData = async () =>{



    try {


      const res4 = await fetch('/getCount',{
        method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
      })

      const Data4 = await res4.json();
      // console.log(Data4);
      setCountMe(Data4)

      const res5 = await fetch('/getPolar',{
        method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
      })

      const Data5 = await res5.json();
      // console.log(Data4);
      setCountPolar(Data5);



        const res2 = await fetch('/getdata',{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })

        const Data = await res2.json();
        setRootUser(Data);
        setChatUser(Data);
        const res = await fetch('/getUsers',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const res3 = await fetch('/getNewUsers',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data3 = await res3.json();
        setNewUsers(data3)
        setNewU(data3)

        setShowUsers(true)

        const data = await res.json();
        const newData = data.filter(e=>{
            return e._id!==Data._id;
        })
        // console.log(newData);
        setUsers(newData)
        setShowData(newData)
      } catch (error) {
          // console.log(error);
          console.log('data not found');
      }
  }

  useEffect(() => {
    getData();
  }, [open])


  return (
    <>
      <BrowserRouter>
      <userContext.Provider value={{
        users,
        setUsers,
        setShowData,
        showData,
        open,
        setOpen,
        open2,
        setOpen2,
        rootUser,
        setRootUser,
        chatUser,
        setChatUser,
        adminKey, 
        setAdminKey,
        isAdmin,
        setIsAdmin,
        edit, 
        setEdit,
        newUsers,
        setNewUsers,
        newU, 
        setNewU,
        countMe, 
        setCountMe,
        countPolar, 
        setCountPolar,
        open3,
        setOpen3,
        open4, 
        setOpen4,
        showUsers
      }}>
        <Switch>
          <Route exact path='/'>
            
            <ChatPage />
          </Route>
        </Switch>
      </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;



