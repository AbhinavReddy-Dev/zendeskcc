const express = require('express');
const bodyParser = require('body-parser');
const { getTicketsPerPg } = require('./tickets/getTickets');
const { port } = require('./config');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});


app.get('/api/getTickets', async (req, res) => {
  const reqBody = req.query;
  const data = await getTicketsPerPg(reqBody);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});



app.listen(port, () =>
  console.log(`Tickets server is running on localhost:${port}`)
);
