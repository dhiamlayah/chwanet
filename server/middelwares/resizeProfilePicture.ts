export{}
const sharp = require('sharp');
const fs  = require('fs')

interface File{
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}

interface ResizedImage {
    format: string,
    width: number,
    height:number,
    channels: number,
    premultiplied: boolean,
    size:number,
    filename: string,
    destination: string
}


const asyncMiddleware = (fn : Function ) => (req:any, res:any, next:any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  


const resizeProfilePicture= asyncMiddleware( async( req:any,res:any,next:any)=>{
    const file : File = req.file;    
    // Assuming req.user._id is the user's ID
    const userFolder = `./userPicture/${req.user._id}/`;


    if (!fs.existsSync(userFolder)) {
     fs.mkdirSync(userFolder, { recursive: true });
    }
 
    if (!fs.existsSync(userFolder+"ProfileImage/")) {
      fs.mkdirSync(userFolder+"ProfileImage/", { recursive: true }); // Create directory recursively if it doesn't exist
    }
 
    // Use Sharp for image processing
    const image = sharp(file.path) //path to the stored image 
    try{
       await image.metadata().   // get image metadata for size 
        then((metadata:any)=>{
          if (metadata.width > 550) {
            return image.resize({ width: 550 }).toFile(`${userFolder}ProfileImage/${file.originalname}`) ; // resize if too big
          } else {
            return image.toFile(`${userFolder}ProfileImage/${file.originalname}`);
          }
        }).then((data:ResizedImage)=>{
            fs.rmSync(req.file.path, { force: true }); // delete the tmp file as now have buffer
            data.filename = "ProfileImage/"+file.originalname
            data.destination= userFolder+"ProfileImage/"
            req.imageResized = data
            next()
        });  
     
    }catch(error){
        next(error)
    }
}
)

module.exports= resizeProfilePicture