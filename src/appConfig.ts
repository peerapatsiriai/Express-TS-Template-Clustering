import dotenv from 'dotenv';
import { cpus } from 'os';

dotenv.config();

const appConfig = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  CPU_COUNT: Number(process.env.CPU_COUNT) || cpus().length,
};

export default appConfig;
