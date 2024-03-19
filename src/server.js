import express from 'express';
const app = express();

app.use(express.json());

// Routers
import polyanetRouter from './api/polyanets.js';
import soloonRouter from './api/soloons.js';
import comethRouter from './api/comeths.js';

app.use('/api/polyanets', polyanetRouter);
app.use('/api/soloons', soloonRouter);
app.use('/api/comeths', comethRouter);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

