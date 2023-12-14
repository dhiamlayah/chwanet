import {useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../StyleDesign/navbar.css";
import NavbarForBigScreen from "./navbarComponents/navbarForBigScreen";
import NavBarForSmallScreen from "./navbarComponents/navbarForSmallScreen";

const NavBar = ({ user }: any) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navbarDesign = () => {
    if (
      location.pathname === "/register" ||
      location.pathname === "/register/info"
    ) {
      return "specialNav";
    } else {
      return "";
    }
  };

  const handleClick = () => {
    setShow((prev) => !prev);
    setShowProfile(false)
  };

  const navColor = ()=>{
    console.log('paaaaaaaaaath ',location.pathname)
    if(/^\/profile\//.test(location.pathname))return { backgroundColor: "rgba(0, 0, 0)" }
    return { backgroundColor: "rgba(0, 0, 0, 0.8)" }
  
  }

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom border-dark fixed-top"
      style={navColor()}
      id={navbarDesign()}
    >
      <div className="container-fluid  ">
        <img
          src="../images/logo4.png"
          style={{ width: "7rem", height: "3rem" }}
          alt="logo"
        />


        <button
          className="navbar-toggler btn bg-warning"
          type="button"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faBars} rotation={show? 90 : 180 }/>
        </button>


        <NavbarForBigScreen user={user}/>
        <NavBarForSmallScreen user={user} show={show} setShowProfile={setShowProfile} showProfile={showProfile} setShow={setShow}/>
        
 
      </div>
      
      
    </nav>
  );
};

export default NavBar;
