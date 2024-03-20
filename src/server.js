import express from 'express';
import 'dotenv/config';
import { mainPrompt } from './utils/prompt.js';

const app = express();
const port = 3000;

app.use(express.json());

// Routers
import { polyanetsRouter, soloonsRouter, comethsRouter, mapStateRouter } from './api/index.js'
app.use('/api/polyanets', polyanetsRouter);
app.use('/api/soloons', soloonsRouter);
app.use('/api/comeths', comethsRouter);
app.use('/api/mapState', mapStateRouter);


// Start Server
async function startServer() {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

  console.log("Current Map State:");
  mainPrompt()

}

startServer();

