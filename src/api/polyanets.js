import express from 'express';
import { createPolyanet, deletePolyanet } from '../controllers/polyanetsController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { row, column } = req.body;
  try {
    const data = await createPolyanet(row, column);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Polyanet', error: error.message });
  }
});

router.delete('/', async (req, res) => {
  const { row, column } = req.body;
  try {
    const data = await deletePolyanet(row, column);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Polyanet', error: error.message });
  }
});

export default router;
