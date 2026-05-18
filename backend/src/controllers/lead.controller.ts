import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async(
 req:Request,
 res:Response
) => {

 try{

 const {
   title,
   company,
   contactName,
   email
 } = req.body;

 const lead = await Lead.create({

   title,
   company,
   contactName,
   email,

   createdBy:(req as any).user.id

 });

 res.status(201).json(lead);

 }catch(error){

  res.status(500).json({
    message:"Server Error"
  });

 }

};


export const getLeads = async(
 req:Request,
 res:Response
)=>{

 try{

 const leads = await Lead.find()
 .populate("assignedTo","name email");

 res.json(leads);

 }catch{

   res.status(500).json({
    message:"Server Error"
   });

 }

};