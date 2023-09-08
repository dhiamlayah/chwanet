import CarouselExemples from "../components/HomeInterface";
import Discreption from "../components/Discreption"
import AddWorker from "../components/AddWorker";
import OurObjectif from "../components/OurObject";
import { useEffect,useState } from "react";

const Home = () => {
 
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