const AWS = require('aws-sdk');

require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();

const express = require('express');
const app = express();
const port = 3000;

app.get('/api/usuarios', (req, res) => {
    const params = {
        TableName: "manual-users-test-candidate",
    };
    res.header("Access-Control-Allow-Origin", "*");
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Error al obtener datos de DynamoDB", JSON.stringify(err, null, 2));
            res.status(500).send("Error al obtener datos de DynamoDB");
        } else {
            res.json(data.Items);
        }
    });
});

app.listen(port, () => {
    console.log(`La API está corriendo en http://localhost:${port}`);
});