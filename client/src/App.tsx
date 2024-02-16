import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WorkerInformation from "./pages/WokerInformation";
import MeAsWorker from "./pages/MeAsWorker";
import SearchWorker from "./pages/SearchWorker";
import LodingPage from "./loading";
import Profile from "./pages/Profile";
import AdminSpace from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ClientOffLine from "./pages/ClientOffLine";

import axios from "axios";

export interface User {
  date: string;
  delegation: string;
  _id: string;
  state: string;
  phone: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  possition: string;
}
interface Worker extends User {
  workName: String;
  discreption: String;
  photo: String;
  experience: Number;
}

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [user, setUser] = useState<User | Worker | null>(null);
  const url: string = process.env.REACT_APP_port + "/meAs"; //url to get current user
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
          setUser(res.data.user);
        });
    } catch (err) {
        return null
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      getCurrentUser();
    }
  }, []);


  // for sheak if the network of the user is ok or not 
  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  return (
    <Router>
      <NavBar user={user} />
      <Suspense fallback={<LodingPage />}>
        {isOnline && (
          <Routes>
            <Route path="/" element={<Home /> } />
            {!user && <Route path="/register" element={<Register />} />}
            <Route path="/register/info" element={<WorkerInformation />} />
            {!user && <Route path="/login" element={<Login />} />}
            {user && <Route path="/profile/me" element={<MeAsWorker />} />}
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/searchWorker" element={<SearchWorker />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            {user && user.isAdmin && (
              <Route path="/admin" element={<AdminSpace />} />
            )}
            <Route path="/*" element={<NotFound />} />
          </Routes>
        )}
        {!isOnline &&<ClientOffLine/>}
      </Suspense>
    </Router>
  );
}

export default App;
