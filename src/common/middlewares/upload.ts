import { Request, Response, NextFunction, RequestHandler } from "express";
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage()

const limits = { fileSize: 5 * 1024 * 1024 }

const checkFileType = (file:any, cb:Function) => {
    const fileTypes:RegExp = /jpeg|jpg|png|gif|svg|webp/i;
  
    const validExt = fileTypes.test(path.extname(file.originalname));
    const validMimeType = fileTypes.test(file.mimetype);
    if (validExt && validMimeType){return cb(null, true)};
    cb("Error: Only images are allowed!");
  };

  const fileFilter =  (req:Request, file:any, cb:Function) => {
    checkFileType(file, cb);
  }


const upload = multer({storage, limits, fileFilter}).single("")


export const uploadMiddleware:RequestHandler = (req:Request, res:Response, next:NextFunction) => {
    upload(req, res, (err:any) => {
        if (err instanceof multer.MulterError) return res.status(400).json({ message: err.message });
        if (err) return res.status(400).json({ message: err });
        res.status(200).json({ message: "Image succesfully uploaded" });

        next();
    });
    };
