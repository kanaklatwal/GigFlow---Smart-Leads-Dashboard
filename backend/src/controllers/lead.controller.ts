import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
 req: Request,
 res: Response
) => {

 try {

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

   createdBy: (req as any).user.id

 });

 res.status(201).json(lead);

 } catch {

  res.status(500).json({
    message: "Server Error"
  });

 }

};


export const getLeads = async (
 req: Request,
 res: Response
) => {

 try {

 const page = Number(req.query.page) || 1;
 const limit = 10;
 const skip = (page - 1) * limit;

 const {
   status,
   source,
   search,
   sort
 } = req.query;

 let filter: any = {};

 if (status) {
   filter.status = status;
 }

 if (source) {
   filter.source = source;
 }

 if (search) {

   filter.$or = [

   {
    contactName: {
      $regex: search,
      $options: "i"
    }
   },

   {
    email: {
      $regex: search,
      $options: "i"
    }
   }

   ];

 }

 let sortOption: any = {
   createdAt: -1
 };

 if (sort === "oldest") {

   sortOption = {
      createdAt: 1
   };

 }

 const total =
 await Lead.countDocuments(filter);

 const leads =
 await Lead.find(filter)
 .populate(
   "assignedTo",
   "name email"
 )
 .sort(sortOption)
 .skip(skip)
 .limit(limit);

 res.json({

   data: leads,
   page,
   totalPages:
   Math.ceil(total / limit),
   total

 });

 } catch {

   res.status(500).json({
     message: "Server Error"
   });

 }

};


export const getLeadById = async (
 req: Request,
 res: Response
)=>{

 try{

 const lead =
 await Lead.findById(
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

 const lead=
 await Lead.findByIdAndUpdate(
 req.params.id,
 req.body,
 {new:true}
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


export const deleteLead = async(
 req:Request,
 res:Response
)=>{

 try{

 const lead =
 await Lead.findByIdAndDelete(
 req.params.id
 );

 if(!lead){

 return res.status(404).json({
   message:"Lead not found"
 });

 }

 res.json({
   message:"Lead deleted"
 });

 }catch{

 res.status(500).json({
   message:"Server Error"
 });

 }

};


export const assignLead = async(
 req:Request,
 res:Response
)=>{

 try{

 const {userId}=req.body;

 const lead =
 await Lead.findByIdAndUpdate(

 req.params.id,

 {assignedTo:userId},

 {new:true}

 ).populate(
 "assignedTo",
 "name email"
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


export const updateLeadStatus = async(
 req:Request,
 res:Response
)=>{

 try{

 const {status}=req.body;

 const lead =
 await Lead.findByIdAndUpdate(

 req.params.id,

 {status},

 {new:true}

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


export const getLeadStats = async(
 req:Request,
 res:Response
)=>{

 try{

 const total =
 await Lead.countDocuments();

 const newLeads =
 await Lead.countDocuments({
 status:"new"
 });

 const qualified =
 await Lead.countDocuments({
 status:"qualified"
 });

 const closed =
 await Lead.countDocuments({
 status:"closed"
 });

 res.json({

 total,
 new:newLeads,
 qualified,
 closed

 });

 }catch{

 res.status(500).json({
   message:"Server Error"
 });

 }

};