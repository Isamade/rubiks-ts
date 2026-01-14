//import fs from 'fs';
//import { hey } from './helper.js';
//import yo from './helper.cjs';

//console.log(yo);
//console.log(hey());

import express from 'express';
import { Router } from 'express';

import './rotation.js';
import { topClockwise } from './rotation.js';

const app = express();
const port = 3000;
const router = Router();

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
        // Perform rotation logic here
        const result = topClockwise(data.cubeState);
        res.json({ result });
    }
    res.json({ received: data });
});

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});