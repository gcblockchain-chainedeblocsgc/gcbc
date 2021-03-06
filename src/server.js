const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const app = express();

const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
