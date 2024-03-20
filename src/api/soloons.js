import express from 'express';
import { soloonsController } from '../controllers/index.js';

const router = express.Router();

router.post('/soloons', async (req, res) => {
    try {
        const { row, column } = req.body;
        await soloonsController.create(row, column);
        res.status(201).send('Soloon created successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/soloons', async (req, res) => {
    try {
        const { row, column } = req.body;
        await soloonsController.delete(row, column);
        res.status(200).send('Soloon deleted successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
