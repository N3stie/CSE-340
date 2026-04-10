console.log('✅ Account routes file loaded!');

require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// adding the cookie parser middleware to parse cookies from incoming requests
const cookieParser = require('cookie-parser');
const accountRoutes = require('./routes/account');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const inventoryRoutes = require('./routes/inventory');
app.use('/inv', inventoryRoutes);
app.use('/account', accountRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/test123', (req, res) => {
    res.send('SUCCESS! The server is working!');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});