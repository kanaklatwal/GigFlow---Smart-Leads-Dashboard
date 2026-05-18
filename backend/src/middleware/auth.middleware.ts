import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
 id:string;
}

export const protect=(
 req:Request,
 res:Response,
 next:NextFunction
)=>{

 let token;

 if(
   req.headers.authorization &&
   req.headers.authorization.startsWith("Bearer")
 ){

   token=req.headers.authorization.split(" ")[1];

   try{

     const decoded=jwt.verify(
       token,
       process.env.JWT_SECRET!
     ) as JwtPayload;

     (req as any).user=decoded;

     return next();

   }catch{

     return res.status(401).json({
       message:"Token invalid"
     });
   }

 }

 return res.status(401).json({
   message:"No token"
 });

};