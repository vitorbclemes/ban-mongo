import mongoose from 'mongoose';
import client from '../models/client.js';
import eventSchema from '../models/event.js';
import appointmentSchema from '../models/appointment.js';

const Client = mongoose.model('Client');
const Event = mongoose.model('Event');
const Appointment = mongoose.model('Appointment');

export default {
  async index(req,res){
    const client = await Client.find();
    return res.json(client);
  },
  async show(req,res){
    const client = await Client.findOne({cpf:req.params.cpf,senha:req.params.senha});
    return res.json(client);
  },
  async store(req,res){
    await Client.create(req.body);
    return res.status(201).send({'answer':"Success"});

  },
  async update(req,res){
    await Client.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(201).send({'answer':"Success"});
  },
  async destroy(req,res){
    await Client.findByIdAndRemove(req.params.id);
    await Event.deleteMany({idCliente:req.params.id})
    await Appointment.deleteMany({idCliente:req.params.id})
    return res.status(201).send({'answer':"Success"});
  }
};