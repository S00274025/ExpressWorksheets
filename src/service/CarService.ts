
import { HydratedDocument } from 'mongoose';
import { CarModel, ICar } from '../models/cars';
import { NotFoundError } from '../apperrors/appError';

export class CarService {
  async getAllCars(): Promise<ICar[]> {
    return await CarModel.find().lean();
  }

  async getCarById(id: string): Promise<ICar> {
    const car = await CarModel.findById(id).lean();

    if (!car) {
      throw new NotFoundError('Car');
    }

    return car;
  }

  async createCar(
    carData: ICar
  ): Promise<HydratedDocument<ICar>> {
    const car = new CarModel(carData);
    return await car.save();
  }

  async updateCar(
    id: string,
    carData: Partial<ICar>
  ): Promise<ICar> {
    const car = await CarModel.findByIdAndUpdate(
      id,
      carData,
      { returnDocument: 'after', runValidators: true }
    ).lean();

    if (!car) {
      throw new NotFoundError('Car');
    }

    return car;
  }

  async deleteCar(id: string): Promise<ICar> {
    const car = await CarModel.findByIdAndDelete(id).lean();

    if (!car) {
      throw new NotFoundError('Car');
    }

    return car;
  }
}
