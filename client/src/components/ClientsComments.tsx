import axios from "axios";


const ClientsComments = () => {
    const url: string = process.env.REACT_APP_port + "/commentWorker/657a2fa2901062c8f235f739";   
    const getComments = async ()=>{
        await axios.get('')
    }


    return (
        <div>
        <ul className="list-group">
           
            <li className="list-group-item disabled text-dark lh-1">
                <p className="lh-1"><span className="text-primary fw-bold px-1">mohamed salem</span> : 25/07/2024</p>
                <p className="lh-1  text-secondary " style={{marginTop:"-5px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus voluptate fugiat quibusdam vitae facilis quae enim alias veniam? Eius excepturi eveniet molestiae nesciunt veniam in facilis, at sunt mollitia?</p>
            </li>
            <li className="list-group-item disabled text-dark lh-1">
                <p className="lh-1"><span className="text-primary fw-bold px-1">mohamed salem</span> : 25/07/2024</p>
                <p className="lh-1  text-secondary " style={{marginTop:"-5px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus voluptate fugiat quibusdam vitae facilis quae enim alias veniam? Eius excepturi eveniet molestiae nesciunt veniam in facilis, at sunt mollitia?</p>
            </li>
            <li className="list-group-item disabled text-dark lh-1">
                <p className="lh-1"><span className="text-primary fw-bold px-1">mohamed salem</span> : 25/07/2024</p>
                <p className="lh-1 text-secondary " style={{marginTop:"-5px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus voluptate fugiat quibusdam vitae facilis quae enim alias veniam? Eius excepturi eveniet molestiae nesciunt veniam in facilis, at sunt mollitia?</p>
            </li>
            <li className="list-group-item disabled text-dark lh-1">
                <p className="lh-1"><span className="text-primary fw-bold px-1">mohamed salem</span> : 25/07/2024</p>
                <p className="lh-1  text-secondary" style={{marginTop:"-5px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus voluptate fugiat quibusdam vitae facilis quae enim alias veniam? Eius excepturi eveniet molestiae nesciunt veniam in facilis, at sunt mollitia?</p>
            </li>
            <li className="list-group-item disabled text-dark lh-1">
                <p className="lh-1"><span className="text-primary fw-bold px-1">mohamed salem</span> : 25/07/2024</p>
                <p className="lh-1  text-secondary" style={{marginTop:"-5px"}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus voluptate fugiat quibusdam vitae facilis quae enim alias veniam? Eius excepturi eveniet molestiae nesciunt veniam in facilis, at sunt mollitia?</p>
            </li>
            
        </ul>
     </div>
      );
}
 
export default ClientsComments;