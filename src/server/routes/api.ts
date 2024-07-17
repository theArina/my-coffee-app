import { Router } from 'express';
import { getRandomCoffee, getRandomImage } from '../lib/api.ts';
import errorHandler from '../middleware/errorHandler.ts';

const router = Router();

router.get('/coffee', async (req, res, next) => {
  try {
    const useLastValue = req.query.isFirst === 'true';
    const data = await getRandomCoffee(useLastValue);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/image', async (req, res, next) => {
  try {
    const useLastValue = req.query.isFirst === 'true';
    const data = await getRandomImage(useLastValue);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

export default router;
