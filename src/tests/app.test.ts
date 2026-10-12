import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import { app } from '../app';

const { mockCarService } = vi.hoisted(() => ({
  mockCarService: {
    getAllCars: vi.fn(),
    getCarById: vi.fn(),
    createCar: vi.fn(),
    updateCar: vi.fn(),
    deleteCar: vi.fn(),
  },
}));

const mockCars = [
  { _id: '1', make: 'Ford', model: 'Focus', year: 2019 },
  { _id: '2', make: 'Toyota', model: 'Corolla', year: 2020 },
];

vi.mock('../service/CarService', () => ({
  CarService: class {
    constructor() {
      return mockCarService;
    }
  },
}));

describe('Express app', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /ping returns the expected message', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Borys Moskalenko');
  });

  it('GET /api/v1/cars requires a valid api-key header', async () => {
    mockCarService.getAllCars.mockResolvedValue(mockCars);

    const response = await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', 'valid-key');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCars);
  });

  it('POST /api/v1/cars without an API key is rejected', async () => {
    const response = await request(app)
      .post('/api/v1/cars')
      .send({ make: 'Toyota', model: 'Corolla', year: 2020 });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Missing api-key header/i);
  });

  it('POST /api/v1/cars accepts valid payloads with an api-key', async () => {
    const createdCar = { _id: '99', make: 'Honda', model: 'Civic', year: 2021 };
    mockCarService.createCar.mockResolvedValue(createdCar);

    const response = await request(app)
      .post('/api/v1/cars')
      .set('x-api-key', 'valid-key')
      .send({ make: 'Honda', model: 'Civic', year: 2021 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdCar);
  });

  it('POST /api/v1/cars rejects invalid payloads', async () => {
    const response = await request(app)
      .post('/api/v1/cars')
      .set('x-api-key', 'valid-key')
      .send({ make: '', model: '', year: 1940 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('PUT /api/v1/cars/:id updates cars with a valid payload', async () => {
    const updatedCar = { _id: '1', make: 'BMW', model: '3 Series', year: 2022 };
    mockCarService.updateCar.mockResolvedValue(updatedCar);

    const response = await request(app)
      .put('/api/v1/cars/507f1f77bcf86cd799439011')
      .set('x-api-key', 'valid-key')
      .send({ make: 'BMW', model: '3 Series', year: 2022 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCar);
  });

  it('DELETE /api/v1/cars/:id deletes the selected car', async () => {
    const deletedCar = { _id: '1', make: 'Ford', model: 'Focus', year: 2019 };
    mockCarService.deleteCar.mockResolvedValue(deletedCar);

    const response = await request(app)
      .delete('/api/v1/cars/507f1f77bcf86cd799439011')
      .set('x-api-key', 'valid-key');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(deletedCar);
  });
});
