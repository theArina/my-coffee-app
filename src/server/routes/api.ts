import { Router } from 'express';
import { getRandomCoffee, getRandomImage } from '../lib/api.ts';

const router = Router();

router.get('/coffee', async (req, res) => {
  try {
    const data = await getRandomCoffee();
    res.json(data);
  } catch (error) {
    const errorMessage = 'Failed to fetch coffee data';
    console.error(errorMessage, error);
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/image', async (req, res) => {
  try {
    const data = await getRandomImage();
    res.json(data);
  } catch (error) {
    const errorMessage = 'Failed to fetch image data';
    console.error(errorMessage, error);
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
