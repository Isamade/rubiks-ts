import express from 'express';
import { Router } from 'express';
import cors from 'cors';

import {
    topClockwise,
    topCounterClockwise,
    bottomClockwise,
    bottomCounterClockwise,
    rightClockwise,
    rightCounterClockwise,
    leftClockwise,
    leftCounterClockwise,
    frontClockwise,
    frontCounterClockwise,
    backClockwise,
    backCounterClockwise
} from './rotation.js';

import { scrambleCube } from './scramble.js';
import { solveAlgorithmic } from './solver-client.js';
import { publishSolution } from './rabbitmq.js';

const app = express();
const port = 3000;
const router = Router();

app.use(cors());
app.use(express.json());
app.use(router);

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/api/data', (req, res) => {
    res.json({ message: 'Data endpoint' });
});


router.post('/rotate', (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'No data provided' });
    }
    else if (typeof data !== 'object') {
        return res.status(400).json({ error: 'Invalid data format' });
    }
    else if (data.move === 'U') {
        const result = topClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'U\'') {
        const result = topCounterClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'D') {
        const result = bottomClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'D\'') {
        const result = bottomCounterClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'R') {
        const result = rightClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'R\'') {
        const result = rightCounterClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'L') {
        const result = leftClockwise(data.cubeState.pieces);
        return res.json({ pieces: result })
    }
    else if (data.move === 'L\'') {
        const result = leftCounterClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'F') {
        const result = frontClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'F\'') {
        const result = frontCounterClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'B') {
        const result = backClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else if (data.move === 'B\'') {
        const result = backCounterClockwise(data.cubeState.pieces);
        return res.json({ pieces: result });
    }
    else {
        return res.json({ pieces: data.cubeState.pieces });
    }
});

router.post('/scramble', (req, res) => {
    const data = req.body;
    if (!data || typeof data !== 'object' || typeof data.movesCount !== 'number' || !data.cubeState) {
        return res.status(400).json({ error: 'Invalid request data' });
    }
    const { cubeState } = scrambleCube(data.cubeState.pieces, data.movesCount);
    return res.json({ pieces: cubeState });
});

router.post('/solve', async (req, res) => {
    const data = req.body;
    if (!data || !data.cubeState) {
        return res.status(400).json({ error: 'Invalid request data' });
    }
    try {
        const result = await solveAlgorithmic(data.cubeState);
        return res.json(result);
    } catch (err: any) {
        console.error('Error calling solver:', err);
        return res.status(500).json({ error: err.message });
    }
});

router.post('/save', async (req, res) => {
    const data = req.body;
    if (!data || !data.initialState || !data.moves) {
        return res.status(400).json({ error: 'Invalid request data. Requires initialState and moves.' });
    }

    const success = await publishSolution(data);
    console.log('Publish result:', success);
    if (success) {
        return res.json({ message: 'Solution published to RabbitMQ' });
    } else {
        return res.status(500).json({ error: 'Failed to publish solution to RabbitMQ' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});