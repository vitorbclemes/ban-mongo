import express from 'express';
import clientController from './controllers/clientController.js';
import workerController from './controllers/workerController.js';
import fieldController from './controllers/fieldController.js';
import blockController from './controllers/blockController.js';
import eventController from './controllers/eventController.js';
import appointmentController from './controllers/appointmentController.js';

const routes = express.Router();

routes.get("/clients",clientController.index);
routes.get('/clients/:cpf/:senha',clientController.show);
routes.post('/clients',clientController.store);
routes.put('/clients/:id',clientController.update);
routes.delete('/clients/:id',clientController.destroy);

routes.get("/workers",workerController.index);
routes.get('/workers/:login/:senha',workerController.show);
routes.post('/workers',workerController.store);
routes.put('/workers/:id',workerController.update);
routes.delete('/workers/:id',workerController.destroy);

routes.get("/fields",fieldController.index);
routes.get('/fields/:id',fieldController.show);
routes.post('/fields',fieldController.store);
routes.put('/fields/:id',fieldController.update);
routes.delete('/fields/:id',fieldController.destroy);

routes.get("/blocks",blockController.index);
routes.get('/blocks/:id',blockController.show);
routes.post('/blocks',blockController.store);
routes.put('/blocks/:id',blockController.update);
routes.delete('/blocks/:id',blockController.destroy);

routes.get("/events",eventController.index);
routes.get('/events/:id',eventController.show);
routes.post('/events',eventController.store);
routes.put('/events/:id',eventController.update);
routes.delete('/events/:id',eventController.destroy);

routes.get("/appointments",appointmentController.index);
routes.get('/appointments/:id',appointmentController.show);
routes.post('/appointments',appointmentController.store);
routes.put('/appointments/:id',appointmentController.update);
routes.delete('/appointments/:id',appointmentController.destroy);

export default routes;