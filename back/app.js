import express from 'express';
const app = express();

app.get('/', (req, res) => {
    console.log("Alex joto")
})

export default app;