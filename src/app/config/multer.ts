import multer from 'multer';

import * as path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    if(process.env.NODE_ENV=="prod"){

      cb(null, 'uploads/');  
    } else {

      cb(null, 'tests/uploads'); 
    }
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split('.');
    let ext = extension[extension.length-1];

    const newFileName = `${Date.now()}.${ext}`;
    cb(null, newFileName);
  },
});

export const upload = multer({ storage });

