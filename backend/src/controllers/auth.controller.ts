import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

export const register = async (
 req: Request,
 res: Response
) => {

try{

const {name,email,password,role}=req.body;

const existingUser=await User.findOne({email});

if(existingUser){
return res.status(400).json({
message:"User already exists"
});
}

const hashedPassword=
await bcrypt.hash(password,10);

const user=await User.create({
name,
email,
password:hashedPassword,
role
});

res.status(201).json({
_id:user._id,
name:user.name,
email:user.email,
role:user.role,
token:generateToken(
user._id.toString()
)
});

}catch(error){

res.status(500).json({
message:"Server Error"
});

}

};