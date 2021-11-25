const express = require("express");
const bodyParser = require("body-parser");
const { getTicketsPerPg, getTicketByID } = require("./tickets/getTickets");
const { port } = require("./config");
const pino = require("express-pino-logger")();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);

app.get("/api/getTickets", async (req, res) => {
  const reqBody = req.query;
  try {
    res.setHeader("Content-Type", "application/json");
    const { data } = await getTicketsPerPg(reqBody);
    res.json(data);
    return res;
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.get("/api/getTicketByID", async (req, res) => {
  const reqBody = req.query;
  try {
    res.setHeader("Content-Type", "application/json");
    const { data } = await getTicketByID(reqBody);
    res.json(data);
    return res;
  } catch (err) {
    console.log("Error: ", err);
  }
});

app.listen(port, () =>
  console.log(`Tickets server is running on localhost:${port}`)
);
