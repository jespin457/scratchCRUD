const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const apiRouter = require(path.resolve(__dirname, './routers/apiRouter.js'));

///////////////////////////////////////////////////////////////////////////////////////

//PARSES URL ROUTE INTO req.params OR req.query ||| PARSES JSON INTO JS OBJECTS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SERVES STATIC FILES
app.use(express.static(path.join(__dirname, '../' )));

//ROUTERS
app.use('/api', apiRouter);

//GLOBAL ERROR HANDLER
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {console.log(`Listening on port: ${PORT}...`)}); //listens on port 3000 -> http://localhost:3000/
