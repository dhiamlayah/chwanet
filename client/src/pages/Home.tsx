import CarouselExemples from "../components/HomeInterface";
import Discreption from "../components/Discreption"
import AddWorker from "../components/AddWorker";
import OurObjectif from "../components/OurObject";
import { useEffect,useState } from "react";

const Home = ({getToken}:any) => {
    useEffect(()=>{ if(localStorage.getItem('Token')!==null){
        getToken(localStorage.getItem('Token'))
     }},[])
     
    return ( 
        <div>
            <CarouselExemples/>
            <Discreption/>
            <AddWorker/>
            <OurObjectif/>
        </div>
     );
}
 
export default Home;