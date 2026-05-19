import mongoose,{Schema,Document} from "mongoose";

export interface ILead extends Document{
 title:string;
 company:string;
 contactName:string;
 email:string;
 status:string;
 assignedTo?:mongoose.Types.ObjectId;
 createdBy:mongoose.Types.ObjectId;
}

const leadSchema = new Schema(
{
 title:{
   type:String,
   required:true
 },

 company:{
   type:String,
   required:true
 },

 contactName:{
   type:String,
   required:true
 },

 email:{
   type:String,
   required:true
 },

 status:{
   type:String,
   enum:["new","contacted","qualified", "closed"],
   default:"new"
 },

 assignedTo:{
   type:Schema.Types.ObjectId,
   ref:"User"
 },

 createdBy:{
   type:Schema.Types.ObjectId,
   ref:"User",
   required:true
 }

},
{
 timestamps:true
}
);

export default mongoose.model<ILead>(
 "Lead",
 leadSchema
);