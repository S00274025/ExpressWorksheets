import { Router } from 'express'; 

import {validate} from '../middleware/validate.middleware';
import {createCarZSchema, updateCarZSchema}  from '../models/cars';

import { CarController } from '../controllers/cars'; 
import { authenticateKey } from '../middleware/auth.middleware';

 

const router = Router(); 

const carController = new CarController(); 

 
router.post('/', validate(createCarZSchema), carController.createCar);

router.get('/', carController.getCars); 

router.get('/:id', carController.getCarById); 

router.post('/',authenticateKey, carController.createCar); 

router.put('/:id', validate(updateCarZSchema), carController.updateCar); 

router.delete('/:id', carController.deleteCar); 

 

export default router; 