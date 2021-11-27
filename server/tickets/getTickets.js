const axios = require("axios");
const { userName, password } = require("../config");
const { urls } = require("./urls");

const TICKETS_PER_PAGE = 25;
let previousLink = "",
  nextLink = "";

const createTicketsURL = (link = "", cntPerPg = TICKETS_PER_PAGE) => {
  return link === ""
    ? `${urls.getTickets}?page[size]=${cntPerPg}`
    : link === "next"
    ? `${nextLink}&page[size]=${cntPerPg}`
    : `${previousLink}&page[size]=${cntPerPg}`;
};

const getTicketsPerPg = async (reqBody, uName = userName, pWord = password) => {
  const cntPerPg = reqBody.perPg;
  const link = reqBody.link;

  try {
    let ticketsData = await axios.get(createTicketsURL(link, cntPerPg), {
      auth: {
        username: uName,
        password: pWord,
      },
    });

    previousLink = ticketsData.data.links.prev;
    nextLink = ticketsData.data.links.next;
    // console.log(ticketsData);
    ticketsData["ok"] = true;
    return ticketsData;
  } catch (err) {
    // console.log("Error in catch: ", err.response, "error done");
    return {
      status: err.response.status,
      statusText: err.response.statusText,
      data: err.response.data,
      ok: false,
    };
  }
};

const getTicketByID = async (reqBody, uName = userName, pWord = password) => {
  const ticketID = reqBody.tcktId || null;
  try {
    let ticketData = await axios.get(urls.getTicketByID(ticketID), {
      auth: {
        username: uName,
        password: pWord,
      },
    });

    ticketData["ok"] = true;
    return ticketData;
  } catch (err) {
    // console.log("Error: ", err);
    return {
      status: err.response.status,
      statusText: err.response.statusText,
      data: err.response.data,
      ok: false,
    };
  }
};

exports.createTicketsURL = createTicketsURL;
exports.getTicketByID = getTicketByID;
exports.getTicketsPerPg = getTicketsPerPg;
