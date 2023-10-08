import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WorkerInformation from "./pages/WokerInformation";
import MeAsWorker from "./pages/MeAsWorker";
interface User {
  date: string;
  delegation: string;
  _id: string;
  state: string;
  phone: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}
interface Worker extends User {
  workName: String;
  discreption: String;
  photo: String;
  team: Boolean;
  experience: Number;
}

function App() {
  const [user, setUser] = useState<User | Worker | null>(null);
  const url: string = process.env.REACT_APP_port + "/meAs";

  const getCurrentUser = async () => {
    const newUrl = url + localStorage.getItem("User");
    try {
      await axios
        .get(newUrl, {
          headers: {
            token: localStorage.getItem("Token"),
          },
        })
        .then((res) => {
          console.log("successfuly", res.data);
          setUser(res.data.user);
        });
    } catch (err) {
      console.log("ther is an error to get current user ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      getCurrentUser();
    }
  }, []);
  return (
    <Router>
      <NavBar user={user} />
        <Routes>
          <Route path="/" Component={() => <Home />} />
          {!user && <Route path="/register" element={<Register />} />}
          <Route path="/register/info" element={<WorkerInformation/>}/>
          {!user && <Route path="/login" element={<Login />} />}
          {user && <Route path="/me" element={<MeAsWorker/>} />}
          <Route path="/*" element={<h1 className="p-5">Not Found 404</h1>} />
        </Routes>
    </Router>
  );
}

export default App;
