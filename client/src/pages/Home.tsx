import CarouselExemples from "../components/HomeInterface";
import Discreption from "../components/Discreption"
import AddWorker from "../components/AddWorker";
import OurObjectif from "../components/OurObject";
import CarouselForPhoneScreen from "../components/CarouselForPhoneScreen";
import Footer from "../components/Footer";
import NumberUser from "../components/numberUser";
 
const Home = () => {
 
    return ( 
        <div>
            <div className=" d-none d-sm-block">
                <CarouselExemples />    
            </div>
            <div className=" d-block d-sm-none">
                <CarouselForPhoneScreen/>
            </div>
            <Discreption/>
            <AddWorker/>
            <NumberUser/>
            <OurObjectif/>
            <Footer/>
        </div>
     );
}
 
export default Home;