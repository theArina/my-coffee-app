import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.ts';
import config from '../config.ts';

const app = express();
const PORT = process.env.PORT || config.SERVER_PORT;

app.use(cors());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${config.SERVER_BASE}:${PORT}`);
});
