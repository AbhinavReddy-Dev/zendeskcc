const axios = require("axios");
const { userName, password } = require("../config");
const { urls } = require("./urls");

let previousLink = "",
  nextLink = "";

const getTicketsPerPg = async (reqBody) => {
  const cntPerPg = reqBody.perPg || 15;
  const link = reqBody.link || "";

  try {
    let ticketsData = await axios.get(
      link === ""
        ? `${urls.getTickets}?page[size]=${cntPerPg}`
        : link === "next"
        ? `${nextLink}&page[size]=${cntPerPg}`
        : `${previousLink}&page[size]=${cntPerPg}`,
      {
        auth: {
          username: userName,
          password: password,
        },
      }
    );
    previousLink = ticketsData.data.links.prev;
    nextLink = ticketsData.data.links.next;

    return ticketsData;
  } catch (err) {
    console.log("Error: ", err);
  }
  return { data: {} };
};

const getTicketByID = async (reqBody) => {
  const ticketID = reqBody.tcktId || null;
  try {
    let ticketData = await axios.get(urls.getTicketByID(ticketID), {
      auth: {
        username: userName,
        password: password,
      },
    });

    return ticketData;
  } catch (err) {
    console.log("Error: ", err);
  }
  return { data: {} };
};

exports.getTicketByID = getTicketByID;
exports.getTicketsPerPg = getTicketsPerPg;
