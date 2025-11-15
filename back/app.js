import express from 'express';
import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';
import cors from 'cors';
import { getCustomersQuery } from "./querys.js";
const app = express();

let sequelize = null;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true
}));

const authMiddleWare = (req, res, next) => {
    if(sequelize === null) {
        res.status(403).send('Usuario no logeado');
        return;
    }
    next()
}

app.get("/api/checkAuth", authMiddleWare, async (req, res) => {
    res.status(200).send({loged: true, "message" : "ok"});
});

app.post('/api/connect', async (req, res) => {
    try{
        const { user, password, server, database } = req.body;
        sequelize = new Sequelize({
            dialect: MsSqlDialect,
            server: server,
            port: 1433,
            database: database,
            authentication: {
                type: 'default',
                options: {
                    userName: user,
                    password: password,
                }
            },
            encrypt: false,
            trustServerCertificate: true
        })
        await sequelize.authenticate();
        res.status(200).send({"connected": true, message: "Usuario conectado correctamente"});
    }catch(err){
        sequelize = null;
        res.status(500).send({error: err.message});
    }
})

app.get('/api/users',authMiddleWare, async (req, res) => {
    const result = await sequelize.query(getCustomersQuery);
    res.status(200).send({"connected": "SIIII", data: result});
})


export default app;