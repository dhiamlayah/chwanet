import "../StyleDesign/animations.css"
const Description = () => {
    return (  
        <div className="p-5 d-sm-flex d-block"   style={{backgroundColor:'azure'}}>
            <img src="./images/home/la7am.jpg" className="p-2 d-sm-block d-none "   alt="descreptionImg" />
                      
            <div className=" py-3  ">
                <h1 className="pt-5  text-sm-end text-center fw-bold text-dark">TITRE</h1>
                <p className=" text-sm-end text-center pt-3 fw-bold fs-5">مرحبًا بكم في موقعنا، حيث يجتمع كل ما يتعلق بأعمال المنزل! إذا كنت تتطلع إلى الانضمام إلى هذه الجماعة وتحسين هذا الموقع، يكفي أن تقوم بإنشاء حساب هنا. سيتم إضافة اسمك بفخر إلى قائمة المشاركين، وستساهم مشاركاتك في تثريت هذا الفضاء المفيد. نتطلع إلى مشاركتك وتألقك في جعل هذا الموقع أفضل وأكثر تنوعًا</p>
            <button className="btn btn-warning position-relative mt-5 px-4 ">get start</button>
            </div>
        </div>
    );
}
 
export default Description;