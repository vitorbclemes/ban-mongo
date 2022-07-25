import mongoose from 'mongoose';
import workerSchema from '../models/worker.js';

const Worker = mongoose.model('Worker');

export default {
  async index(req,res){
    const worker = await Worker.find();
    return res.json(worker);
  },
  async show(req,res){
    const worker = await Worker.findOne({login:req.params.login,senha:req.params.senha});
    return res.json(worker);
  },
  async store(req,res){
    await Worker.create(req.body);
    return res.status(201).send({'answer':"Success"});
  },
  async update(req,res){
    await Worker.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(201).send({'answer':"Success"});
  },
  async destroy(req,res){
    await Worker.findByIdAndRemove(req.params.id);
    return res.status(201).send({'answer':"Success"});
  }
};