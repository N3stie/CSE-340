require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const inventoryRoutes = require('./routes/inventory');
app.use('/inv', inventoryRoutes);

app.get('/', (req, res) => {
  res.render('index');
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