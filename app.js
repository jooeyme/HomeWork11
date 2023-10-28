const express = require('express');
const app = express();
const todoRouter = require('./routes/todo');
const { sequelize } = require('./models');

app.use(express.json());
app.use('/todos', todoRouter);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

module.exports = app ;