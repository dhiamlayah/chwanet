import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home'
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <NavBar/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>  
    </Routes>   
    </Router>
  );
}

export default App;
