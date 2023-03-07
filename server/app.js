import express from 'express';

const app = express();
const port = 3001

app.get('/mock', (req, res) => {
    console.log('Got the first request!!')
    res.status(200).json({ 'message': 'lets kick start the development' })
})

app.listen(port, () => {
    console.log('Server listening on port: ', port)
});