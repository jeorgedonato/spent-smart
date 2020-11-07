const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false }));
// Serve up static assets (usually on heroku)


//Define routes here
app.use('/api/users', require('./controllers/usersController'));
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/income', require('./controllers/incomeController'));
app.use('/api/categories', require('./controllers/categoriesController'));
app.use('/api/expense', require('./controllers/expenseController'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(PORT)
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});