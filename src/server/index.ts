import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.ts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
