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
    const { status, data, statusText, ok } = await getTicketsPerPg(reqBody);
    res.status(status);
    res.json({ ok, status, statusText, data });
    return res;
  } catch (err) {
    console.log("Error: ", err);
    res.status(418);
    res.json({
      ok: false,
      status: 418,
      statusText: "I'm a teapot",
      data: null,
    });
  }
});

app.get("/api/getTicketByID", async (req, res) => {
  const reqBody = req.query;
  try {
    res.setHeader("Content-Type", "application/json");
    const { data, status, statusText, ok } = await getTicketByID(reqBody);
    res.status(status);
    res.json({ ok, status, statusText, data });
    return res;
  } catch (err) {
    console.log("Error: ", err);
    res.status(418);
    res.json({
      ok: false,
      status: 418,
      statusText: "I'm a teapot",
      data: null,
    });
  }
});

app.listen(port, () =>
  console.log(`Tickets server is running on localhost:${port}`)
);
