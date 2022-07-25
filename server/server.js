import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes.js';
import path from 'path';

// Inicializando app
const app = express();
app.use(express.json());
app.use(cors());

// Conexao com DB
mongoose.connect(process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Rotas
app.use(routes);
app.get('*',(req,res)=> {
  return res.sendFile(path.resolve(path.resolve(),'public','index.html'));
});

// Listen
app.listen(process.env.PORT);