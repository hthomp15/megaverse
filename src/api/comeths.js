import express from 'express';
import { comethsController } from '../controllers/index.js';

const router = express.Router();

router.post('/comeths', async (req, res) => {
    try {
        const { row, column } = req.body;
        await comethsController.create(row, column);
        res.status(201).send('Cometh created successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/comeths', async (req, res) => {
    try {
        const { row, column } = req.body;
        await comethsController.delete(row, column);
        res.status(200).send('Cometh deleted successfully.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
