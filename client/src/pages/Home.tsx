import CarouselExemples from "../components/HomeInterface";
import Discreption from "../components/Discreption"
import AddWorker from "../components/AddWorker";
import OurObjectif from "../components/OurObject";

const Home = () => {
 
    return ( 
        <div>
            <div className=" d-none d-sm-block">
                <CarouselExemples />    
            </div>
        
            <Discreption/>
            <AddWorker/>
            <OurObjectif/>
        </div>
     );
}
 
export default Home;