
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
  


const resizeImages = asyncMiddleware( async( req:any,res:any,next:any)=>{
    const file : File = req.file;    
    console.log('idd',req.user)
    // Assuming req.user._id is the user's ID
    const userFolder = `./userPicture/${req.user._id}/`;

    // Create the user folder if it doesn't exist
    if (!fs.existsSync(userFolder)) {
     fs.mkdirSync(userFolder, { recursive: true });
    }
    // Use Sharp for image processing
    const image = sharp(file.path) //path to the stored image 
    try{
       await image.metadata().   // get image metadata for size 
        then((metadata:any)=>{
          if (metadata.width > 750) {
            return image.resize({ width: 750 }).toFile(`${userFolder}${file.originalname}`) ; // resize if too big
          } else {
            return image.toFile(`${userFolder}${file.originalname}`);
          }
        }).then((data:ResizedImage)=>{
            fs.rmSync(req.file.path, { force: true }); // delete the tmp file as now have buffer
            data.filename = file.originalname
            data.destination=`./userPicture/${req.user._id}`
            req.imageResized = data
            next()
        });  
     
    }catch(error){
        console.log('we have a problem when we resize the image :( =>',error)
        next(error)
    }
}
)

module.exports= resizeImages