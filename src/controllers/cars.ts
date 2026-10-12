
import { Request, Response } from 'express';
import { CarService } from '../service/CarService';

const carService = new CarService();

export class CarController {
  getCars = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  };

  getCarById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.id as string;
    const car = await carService.getCarById(id);
    res.status(200).json(car);
  };

  createCar = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const newCar = await carService.createCar(req.body);
    res.status(201).json(newCar);
  };

  updateCar = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.id as string;
    const updatedCar = await carService.updateCar(
      id,
      req.body
    );

    res.status(200).json(updatedCar);
  };

  deleteCar = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.id as string;
    const deletedCar = await carService.deleteCar(id);

    res.status(200).json({
      success: true,
      data: deletedCar
    });
  };
}
