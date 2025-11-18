import express from 'express';
import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';
import cors from 'cors';
import { getCustomersQuery, getTiposQuery } from "./querys.js";
import { QueryTypes } from "sequelize";
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

app.get('/api/getAllClients',authMiddleWare, async (req, res) => {
    try{
        const result = await sequelize.query(getCustomersQuery, {type: QueryTypes.SELECT});
        res.status(200).send({"result" : result});
    }catch(error){
        res.status(500).send({error: error.message});
    }
})
app.get('/api/getTipos',authMiddleWare, async (req, res) => {
    try{
        const result = await sequelize.query(getTiposQuery, {type: QueryTypes.SELECT});
        res.status(200).send({"result" : result});
    }catch(error){
        res.status(500).send({error: error.message});
    }
})

app.post('/api/saveClient', authMiddleWare, async (req, res) => {
    try {
        const { nombre, apellidos, sexo, limiteCredito, tipo } = req.body;

        const clave = parseInt(req.body.clave) || 0;

        const sql = `
            DECLARE @id_resultado INT;
            SET @id_resultado = :clave;

            EXEC Sp_Mttoclientes
                 @cliid = @id_resultado OUTPUT,
                 @clinombre = :nombre,
                 @cliApellidos = :apellidos,
                 @cliSexo = :sexo,
                 @cliLimiteCredito = :limiteCredito,
                 @tipid = :tipo;

            SELECT @id_resultado AS 'resultadoId';
        `;

        const results = await sequelize.query(sql, {
            replacements: {
                clave: clave, //
                nombre: nombre,
                apellidos: apellidos,
                sexo: sexo,
                limiteCredito: limiteCredito,
                tipo: tipo
            },
            type: QueryTypes.SELECT
        });
        const finalId = results[0].resultadoId;

        // 2. Compara con la variable 'clave' procesada
        const message = (clave === 0)
            ? 'Cliente creado exitosamente'
            : 'Cliente actualizado exitosamente';

        const clienteGuardado = await sequelize.query(
            `SELECT * FROM clientes c
             JOIN Tipos T on c.tipid = T.tipid
             WHERE cliid = :clienteId
            `,
            {
                replacements: { clienteId: finalId },
                type: QueryTypes.SELECT
            }
        );
        res.status(200).json({
            message: message,
            client: clienteGuardado[0]
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: e.message || 'Error al guardar el cliente' });
    }
});

app.delete('/api/deleteClient', async (req, res) => {
    try{
        const { clientId } = req.body;

        const existe = await sequelize.query("SELECT * FROM clientes WHERE cliid = :clienteId ",{
            replacements: {clienteId : clientId},
            type: QueryTypes.SELECT
        });

        if(!existe.length > 0){
            res.status(400).send({error : "El cliente no existe"});
            return;
        }
        const result = await sequelize.query(
            `DELETE FROM clientes WHERE cliid = ?`,
            {
                replacements: [clientId],
                type: QueryTypes.DELETE
            }
        );
        res.status(200).json({ message: 'Cliente eliminado exitosamente', result });
    }catch(e){
        res.status(500).send({error: e});
    }
})



export default app;