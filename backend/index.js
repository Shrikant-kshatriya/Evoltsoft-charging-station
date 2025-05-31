require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./db.js');

const app = express();
const port = process.env.PORT || 4000;

// db connection
db();

// middleware
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',  
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// routes
const authRoutes = require('./routes/authRoutes.js');
const stationRoutes = require('./routes/stationRoutes.js');
const isAuth = require('./middlewares/isAuth.js');

app.use('/api/auth', authRoutes);
app.use('/api/stations', isAuth, stationRoutes);
app.use('/api/public/stations', stationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});