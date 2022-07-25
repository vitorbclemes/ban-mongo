import mongoose from 'mongoose';

const clientSchema =  new mongoose.Schema({
  cpf:{
    type:String,
    required:true
  },
  senha:{
    type:String,
    required:true
  },
  nome:{
    type:String,
    required:true,
  },
  idade:{
    type:Number,
    required:true,
  },
  ocupacao:{
    type:String,
    required:true
  },
  endereco:{
    type:String,
    required:true
  }
});

mongoose.model("Client",clientSchema);
export default clientSchema;