import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import {useEffect,useState} from 'react'
import axios from 'axios';
import NavBar from './components/Navbar';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
interface User {
    date:string,
    delegation:string,
    _id:string,
    state:string,
    phone:number,
    firstName:string,
    lastName:string,
    isAdmin:boolean
  }

function App() {
  const [user,setUser]=useState<User|null>(null)
 
  const getCurrentUser= async ()=>{
    try{
      await axios.get("http://localhost:8000/me",{
      headers:{
        'token':localStorage.getItem('Token')
      }
    }).then((res)=>{
      console.log('successfuly',res.data)
      setUser(res.data.user)
    })
    }catch(err){
      console.log('ther is an error to get current user ', err)
    }
  }
 
  useEffect (()=>{
  const token = localStorage.getItem('Token')
  if(token){
    getCurrentUser()
  }
  },[])
console.log(user)



  return (
    <Router>
      <NavBar user={user}/>
    <Routes>
        <Route path='/' Component={()=><Home/>} />
       {!user && <Route path='/register' element={<Register/>}/>}
       {!user && <Route path='/login' element={<Login/>}/>}
        {user && <Route path='/me' element={<p>hello</p>} />} 
        <Route path='/*' element={<h1 className='p-5'>Not Found 404</h1>}/>
    </Routes>   
    </Router>
  );
}

export default App;
