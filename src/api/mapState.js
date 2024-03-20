import express from 'express';
import { fetchMapState } from '../utils/mapUtils.js';

const router = express.Router();

router.get('/map-state', async (req, res) => {
  try {
    const mapState = await fetchMapState();
    res.json(mapState);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch map state', error: error.message });
  }
});

export default router;
