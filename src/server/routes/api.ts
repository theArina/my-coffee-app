import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

interface Coffee {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}

interface Image {
  file: string;
}

router.get('/coffee', async (req, res) => {
  try {
    const response = await fetch(
      'https://random-data-api.com/api/coffee/random_coffee'
    );
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = (await response.json()) as Coffee;
      res.json(data);
    } else if (contentType?.includes('text/plain')) {
      const data = await response.text();
      throw new Error(`Response text: "${data.toString()}"`);
    } else {
      throw new Error(`Unknown response content type: ${contentType}`);
    }
  } catch (error) {
    const errorMessage = 'Failed to fetch coffee data';
    console.error(errorMessage, error);
    res.status(500).json({ error: errorMessage });
  }
});

router.get('/image', async (req, res) => {
  try {
    const response = await fetch(
      'https://loremflickr.com/json/500/500/coffee,bean'
    );
    const data = (await response.json()) as Image;
    res.json(data);
  } catch (error) {
    const errorMessage = 'Failed to fetch image data';
    console.error(errorMessage, error);
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
