require('./models/Users');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 
`mongodb+srv://avirup:${encodeURIComponent('Epsilon0@301294')}@cluster0.5jufs6w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to mongodb')
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongodb', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('App started on Port 3000!')
});