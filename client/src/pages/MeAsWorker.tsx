import axios from "axios"
import '../StyleDesign/meAsWorker.css'
import { useEffect, useState } from "react"
const MeAsWorker = () => {
    const url = process.env.REACT_APP_port
    const [WorkerInformations,setWorkerInformations]= useState<any>(null)
    const [profilPicture,setProfilePicture]= useState<any>(null)
     const getWorkerInformation = async()=>{
        try{
            await axios.get(url+"/meAsWorker",{
                headers: {
                    token: localStorage.getItem("Token"),
                  },
            }).then((res)=>{
                setWorkerInformations(res.data.user)
            })
        }catch(err){
            console.log(err)
        }
    }
    const chooseImg = () => {
        const imgUrl = `url('/images/home/builder.jpg')`;
         
        return imgUrl;
      };
    
    const getWorkerPicture = async(photo:any)=>{
        try{
            await axios.get(url+"/userPicture/"+photo.filename).then((res)=>{
                console.log("hello",res.config.url)
                setProfilePicture(res.config.url)
            })
        }catch(err){
            console.log('there is an error to get imageUrl',err)
        }
    }
    useEffect(()=>{
         getWorkerInformation()
     },[])
    useEffect(()=>{
       if(WorkerInformations){ getWorkerPicture(WorkerInformations.photo)}
    },[WorkerInformations])


    console.log(WorkerInformations)
    if(!WorkerInformations){
        return <p>wait</p>
    }
    const {firstName,lastName,discreption,phone,state,delegation,workName} = WorkerInformations
    return ( 
        <div className='Profilbackground  ' >
            <div id="content" >
                    <div
                    className="z-8 position-absolute"
                    style={{backgroundImage :chooseImg()}}
                    id="couvertImg">
                    </div>
                    <div className="z-5 position-absolute">
                       <div
                        className="z-8 position-absolute"
                         style={{backgroundImage :`url('${profilPicture}')`}}
                        id="pdp">
                    </div>
                    </div>
            
            </div>
           
            <div id="workerName">
                    <div >
                        <h1 className="fw-bold" >{firstName} {lastName}</h1>
                      </div>
            </div>

            <div id="workerData" className="pt-5 text-end" style={{backgroundColor:"#rgb(255 224 217 / 28%)"}}>
                <div  id="photo"  className="m-1">
                    <div className="border border-secondary-subtle  p-1 ">
                        <p className="fw-bold">{workName}</p>
                        <p>{discreption}</p>
                    </div>
                    {/* <div>
                        <p>photo</p>
                    </div> */}
                </div>
                <div className="border border-secondary-subtle m-1 " id="cartId" >
                   
                    <p><span className="fw-bold">هاتف : </span>{phone}</p>
                    <p><span className="fw-bold">ولاية : </span>{state}</p>
                    <p ><span className="fw-bold">مدينة :</span>{delegation}</p>


                </div>
                
            </div>

        </div>

     );
}
 
export default MeAsWorker;