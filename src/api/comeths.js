import express from 'express';
import { createCometh, deleteCometh } from '../controllers/comethsController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { row, column } = req.body;
  try {
    const data = await createCometh(row, column);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Cometh', error: error.message });
  }
});

router.delete('/', async (req, res) => {
  const { row, column } = req.body;
  try {
    const data = await deleteCometh(row, column);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Cometh', error: error.message });
  }
});

export default router;
