import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  idCliente:{
    type:String,
    required:true
  },
  nome:{
    type:String,
    required:true
  }
});

mongoose.model('Event',eventSchema);
export default eventSchema;