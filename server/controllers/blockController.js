import mongoose from 'mongoose';
import blockSchema from '../models/block.js';
const Block = mongoose.model('Block');

export default {
  async index(req,res){
    const block = await Block.find();
    return res.json(block);
  },
  async show(req,res){
    const block = await Block.findById(req.params.id);
    return res.json(block);
  },
  async store(req,res){
    await Block.create(req.body);
    return res.status(201).send({'answer':"Success"});
  },
  async update(req,res){
    await Block.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(201).send({'answer':"Success"});
  },
  async destroy(req,res){
    await Block.findByIdAndRemove(req.params.id);
    return res.status(201).send({'answer':"Success"});
  }
};