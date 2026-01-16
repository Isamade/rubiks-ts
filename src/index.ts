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
} from './rotation.js';

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
    console.log('Received data:', data);
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
        return res.json({pieces: result });
    }
    else if (data.move === 'R\'') {
        const result = rightCounterClockwise(data.cubeState.pieces);
        return res.json({pieces: result});
    }
    else if (data.move === 'L') {
        const result = leftClockwise(data.cubeState.pieces);
        return res.json({pieces: result})
    }
    else if (data.move === 'L\'') {
        const result = leftCounterClockwise(data.cubeState.pieces);
        return res.json({pieces: result});
    }
    else if (data.move === 'F') {
        const result = frontClockwise(data.cubeState.pieces);
        return res.json({pieces: result});
    }
    else {
        return res.json({pieces: data.cubeState.pieces});
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});