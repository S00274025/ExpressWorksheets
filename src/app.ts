import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import carRoutes from './routes/cars';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { loggerMiddleware } from './middleware/logger.middleware';
import { authenticateKey } from './middleware/auth.middleware';
import { errorHandler } from './middleware/error.middleware';

export const app: Application = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.json({ message: 'hello from Borys Moskalenko S00274025' });
});

app.get('/bananas', (_req: Request, res: Response) => {
  res.json({ message: 'this is bananas' });
});

app.get('/BorysWeb', (_req: Request, res: Response) => {
  res.json({ message: 'Borys Moskalenko page' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/cars', loggerMiddleware, authenticateKey, carRoutes);
app.use(errorHandler);
export const port = env.port;