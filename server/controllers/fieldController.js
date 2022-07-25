import mongoose from 'mongoose';
import fieldSchema from '../models/field.js';
import appointmentSchema from '../models/appointment.js';

const Field = mongoose.model('Field');
const Appointment = mongoose.model('Appointment');

export default {
  async index(req,res){
    const field = await Field.find();
    return res.json(field);
  },
  async show(req,res){
    const field = await Field.findById(req.params.id);
    return res.json(field);
  },
  async store(req,res){
    await Field.create(req.body);
    return res.status(201).send({'answer':"Success"});
  },
  async update(req,res){
    await Field.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(201).send({'answer':"Success"});
  },
  async destroy(req,res){
    await Field.findByIdAndRemove(req.params.id);
    await Appointment.deleteMany({idQuadra:req.params.id});
    return res.status(201).send({'answer':"Success"});
  }
};