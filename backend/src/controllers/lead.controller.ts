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

export const getLeadById = async(
  req:Request,
  res:Response
 )=>{
 
  try{
 
  const lead = await Lead.findById(
    req.params.id
  );
 
  if(!lead){
    return res.status(404).json({
       message:"Lead not found"
    });
  }
 
  res.json(lead);
 
  }catch{
 
    res.status(500).json({
       message:"Server Error"
    });
 
  }
 
 };
 
 
 export const updateLead = async(
  req:Request,
  res:Response
 )=>{
 
  try{
 
  const lead=await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
 
  res.json(lead);
 
  }catch{
 
    res.status(500).json({
       message:"Server Error"
    });
 
  }
 
 };
 
 
 export const deleteLead = async(
  req:Request,
  res:Response
 )=>{
 
  try{
 
  await Lead.findByIdAndDelete(
    req.params.id
  );
 
  res.json({
    message:"Lead deleted"
  });
 
  }catch{
 
    res.status(500).json({
       message:"Server Error"
    });
 
  }
 
 };