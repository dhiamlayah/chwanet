const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./userPictureBeforResizing",
    filename(req: any, file: any, cd: any) {
      cd(null, file.originalname);
    },
  });
  
  
  const upload = multer({ storage });

  module.exports= upload