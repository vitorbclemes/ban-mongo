import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  idEvento:{
    type:String,
    required:false
  },
  idCliente:{
    type:String,
    required:true
  },
  idQuadra:{
    type:String,
    required:true
  },
  idFuncionario:{
    type:String,
    required:false,
  },
  data:{
    type:Date,
    required:true
  },
  horario:{
    type:String,
    required:true,
  },
  antecedencia:{
    type:Date,
    required:false,
  },
  status:{
    type:String,
    required:true
  },
});

mongoose.model('Appointment',appointmentSchema);
export default appointmentSchema;