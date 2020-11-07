const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
// Serve up static assets (usually on heroku)


//Define routes here
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/income', require('./controllers/incomeController'));
app.use('/api/user', require('./controllers/usersController'));
// app.use('/api/expense', require('./controllers/expenseController'));
// app.use('/api/category', require('./controllers/categoriesController'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});