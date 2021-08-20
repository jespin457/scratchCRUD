const express = require('express');
const app = express();
const path = require('path');

const apiRouter = require(path.resolve(__dirname, './routes/apiRouter'));

//PARSES URL ROUTE INTO req.params OR req.query ||| PARSES JSON INTO JS OBJECTS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTERS
app.use('/api', apiRouter);

//SERVES STATIC FILES
app.use(express.static(path.join(__dirname, '../' )));

//GLOBAL ERROR HANDLER
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
