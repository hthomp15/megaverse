import express from 'express';
import { polyanetsController } from '../controllers/index.js';

const router = express.Router();

router.post('/polyanets', async (req, res) => {
    try {
        const { row, column } = req.body;
        await polyanetsController.create(row, column);
        res.status(201).send('Polyanet created successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/polyanets', async (req, res) => {
    try {
        const { row, column } = req.body;
        await polyanetsController.delete(row, column);
        res.status(200).send('Polyanet deleted successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
