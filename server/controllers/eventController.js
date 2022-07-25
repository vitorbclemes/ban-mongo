import mongoose from 'mongoose';
import eventSchema from '../models/event.js';
import appointmentSchema from '../models/appointment.js';

const Event = mongoose.model('Event');
const Appointment = mongoose.model('Appointment');

export default {
  async index(req,res){
    const event = await Event.find();
    return res.json(event);
  },
  async show(req,res){
    const event = await Event.find({idCliente:req.params.id});
    return res.json(event);
  },
  async store(req,res){
    await Event.create(req.body);
    return res.status(201).send({'answer':"Success"});
  },
  async update(req,res){
    await Event.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(201).send({'answer':"Success"});
  },
  async destroy(req,res){
    await Event.findByIdAndRemove(req.params.id);
    await Appointment.deleteMany({idEvento:req.params.id});
    return res.status(201).send({'answer':"Success"});
  }
};