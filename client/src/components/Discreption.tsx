import "../StyleDesign/animations.css"
const Description = () => {
    return (  
        <div className="p-5 d-sm-flex d-block"   style={{backgroundColor:'#42515545'}}>
            <img src="./images/home/la7am.jpg" className="p-2 d-sm-block d-none "   alt="descreptionImg" />
            <img src="./images/home/builder2.jpg" className="d-sm-none d-block w-100 "  alt="descreptionImg" />
                      
            <div className="ps-5 pt-3">
                <h1 className="pt-5 fw-bold text-dark">TITRE</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quidem porro unde? Modi molestiae velit, amet autem vitae ducimus eaque. Reiciendis voluptatum iste quas repudiandae commodi deserunt dignissimos vitae debitis!</p>
            <button className="btn btn-warning position-relative py-2 px-4 ">get start</button>
            </div>
        </div>
    );
}
 
export default Description;