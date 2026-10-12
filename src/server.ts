import { app } from './app';
import { env } from './config/env';
import { connectDB } from './config/database';

export const startServer = async (): Promise<void> => {
  if (env.nodeEnv !== 'test') {
    await connectDB();
  }

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

if (require.main === module) {
  void startServer();
}

