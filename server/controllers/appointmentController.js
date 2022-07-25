import mongoose from 'mongoose';
import appointmentSchema from '../models/appointment.js';

const Appointment = mongoose.model('Appointment');

export default {
  async index(req,res){
    const appointment = await Appointment.find();
    return res.send(appointment);
  },
  async show(req,res){
    const appointment = await Appointment.find({idCliente:req.params.id});
    return res.json(appointment);
  },
  async store(req,res){
    const fieldAlreadyTaken = await Appointment.findOne({horario:req.body.horario,data:req.body.data,idQuadra:req.body.idQuadra}) || null;
    if(fieldAlreadyTaken){
      return res.send({"answer":"Taken"});
    }
    else{
      await Appointment.create(req.body);
      return res.status(201).send({'answer':"Success"});
    }
  },
  async update(req,res){
    await Appointment.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(201).send({'answer':"Success"});
  },
  async destroy(req,res){
    await Appointment.findByIdAndRemove(req.params.id);
    return res.status(201).send({'answer':"Success"});
  }
};