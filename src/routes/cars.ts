
import { Router } from 'express';
import { z } from 'zod';

import { validate } from '../middleware/validate.middleware';
import {
  createCarZSchema,
  updateCarZSchema,
  carParamsSchema
} from '../models/cars';
import { CarController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';

const router = Router();
const carController = new CarController();

const createCarRequestSchema = z.object({
  body: createCarZSchema
});

const updateCarRequestSchema = z.object({
  body: updateCarZSchema,
  params: carParamsSchema.shape.params
});

router.get('/', carController.getCars);

router.get(
  '/:id',
  validate(carParamsSchema),
  carController.getCarById
);

router.post(
  '/',
  authenticateKey,
  validate(createCarRequestSchema),
  carController.createCar
);

router.put(
  '/:id',
  authenticateKey,
  validate(updateCarRequestSchema),
  carController.updateCar
);

router.delete(
  '/:id',
  authenticateKey,
  validate(carParamsSchema),
  carController.deleteCar
);

export default router;
