const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// const {ApolloServer} = require('apollo-server-express');


connectDB();

// app.use(express.json({ extended: false }));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cookieParser());
// Serve up static assets (usually on heroku)


//Define routes here
app.use('/api/users', require('./controllers/usersController'));
app.use('/api/auth', require('./controllers/authController'));
app.use('/api/incomes', require('./controllers/incomeController'));
app.use('/api/categories', require('./controllers/categoriesController'));
app.use('/api/expenses', require('./controllers/expenseController'));

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   playground : true
// });

// server.applyMiddleware({ app });

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