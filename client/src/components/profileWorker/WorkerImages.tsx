const WorkerImages = ({profilPicture}:any) => {
    const chooseImg = () => {
        const imgUrl = `url('/images/home/builder.jpg')`;
        return imgUrl;
      };
    return ( 
        <div>
        <div
          className="z-8 position-absolute"
          style={{ backgroundImage: chooseImg() }}
          id="couvertImg"
        ></div>
        <div className="z-5 position-absolute">
          <div
            className="z-8 position-absolute"
            style={{ backgroundImage: `url('${profilPicture}')` }}
            id="pdp"
          ></div>
      </div>
      </div>
      
     );
}
 
export default WorkerImages;