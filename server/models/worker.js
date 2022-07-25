import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  login:{
    type:String,
    required:true,
  },
  senha:{
    type:String,
    required:true
  },
  nome:{
    type:String,
    required:true
  },
  cargo:{
    type:String,
    required:true
  }
});

mongoose.model('Worker',workerSchema);
export default workerSchema;