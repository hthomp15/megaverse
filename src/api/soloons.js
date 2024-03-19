import express from 'express';
import { createSoloon, deleteSoloon } from '../controllers/soloonsController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { row, column } = req.body;
  try {
    const data = await createSoloon(row, column);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Soloon', error: error.message });
  }
});

router.delete('/', async (req, res) => {
  const { row, column } = req.body;
  try {
    const data = await deleteSoloon(row, column);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Soloon', error: error.message });
  }
});

export default router;
