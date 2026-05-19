import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface JwtPayload{
 id:string;
}

export const protect = async(
 req:Request,
 res:Response,
 next:NextFunction
)=>{

 let token;

 if(
 req.headers.authorization &&
 req.headers.authorization.startsWith(
 "Bearer"
 )
 ){

 token=
 req.headers.authorization.split(
 " "
 )[1];

 try{

 const decoded=
 jwt.verify(
 token,
 process.env.JWT_SECRET!
 ) as JwtPayload;

 const user=
 await User.findById(
 decoded.id
 );

 if(!user){

 return res.status(404).json({
 message:"User not found"
 });

 }

 (req as any).user=user;

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