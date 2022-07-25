import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  idBloco:{
    type:String,
    required:true
  },
  modalidade:{
    type:Array,
    required:true
  },
});

mongoose.model('Field',fieldSchema);
export default fieldSchema;