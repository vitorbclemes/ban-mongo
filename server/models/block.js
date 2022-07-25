import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  nome:{
    type:String,
    required:true
  }
});

mongoose.model('Block',blockSchema)
export default blockSchema;