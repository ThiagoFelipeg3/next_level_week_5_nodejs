import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({
        message: 'Se besta GET'
    });
});

app.post('/user/:id', (req, response) => {
    const { body: bodyRequest } = req;
    console.log(bodyRequest);

    return response.json({
        message: `Se besta POST: ${bodyRequest}`
    });
});

app.listen(3333, () => console.log('Server is running on port 3333'));