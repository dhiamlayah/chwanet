import "../StyleDesign/homePage.css";

const AddWorker = () => {
    return (
        <div className="d-block p-5 d-sm-flex justify-content-around" style={{backgroundColor:'#DEDEDE',height:'90vh'}}>
             <img src="./images/home/team.jpg" className="w-100 pb-2 h-auto d-sm-none d-block rounded-3" alt="team" />
            <div className="descreption">
                <h1>TITLE</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa sit et fugiat, eaque debitis quae nesciunt beatae asperiores harum accusamus provident enim commodi fuga molestias numquam incidunt! Laudantium, neque eum?</p>
                <button className="btn btn-warning">start</button>
            </div>
            <img src="./images/home/team.jpg" className="w-50 h-auto d-sm-block d-none" alt="team" />
        </div>
      );
}
 
export default AddWorker;
//cadetblue