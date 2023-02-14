import express from "express";

const app = express();
app.use(express.json());

const PORT = 3004;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});