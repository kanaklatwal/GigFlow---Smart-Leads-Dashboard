import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const authorize = (...roles:string[]) => {
 return async (
   req:Request,
   res:Response,
   next:NextFunction
 ) => {

   const decoded = (req as any).user;

   const user = await User.findById(decoded.id);

   if(!user){
      return res.status(404).json({
        message:"User not found"
      });
   }

   if(!roles.includes(user.role)){
      return res.status(403).json({
        message:"Access denied"
      });
   }

   next();

 };
};