import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import {useEffect,useState} from 'react'
import NavBar from './components/Navbar';
import Home from './pages/Home'
import Register from './pages/Register';
import axios from 'axios';

function App() {
  const [token,setToken]= useState<string|any>()  
  const getCurrentUser= async ()=>{
    try{
      await axios.get("http://localhost:8000/me",{
      headers:{
        'token':localStorage.getItem('Token')
      }
    }).then((res)=>{
      console.log('successfuly',res.data)
    })
    }catch(err){
      console.log('ther is an error to get current user ', err)
    }
  }
  useEffect( ()=>{
    if(token !==undefined){ 
      getCurrentUser()
    }
  },[token])
 console.log(token)

  return (
    <Router>
      <NavBar/>
    <Routes>
        <Route path='/' Component={()=><Home  getToken={setToken}/>} />
        <Route path='/register' element={<Register/>}/>
        {localStorage.getItem("Token") && <Route path='/me' element={<p>hello</p>} />} 
        <Route path='/*' element={<h1 className='p-5'>Not Found 404</h1>}/>
    </Routes>   
    </Router>
  );
}

export default App;
