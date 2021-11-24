const axios = require("axios");
const { userName, password } = require("../config");
const { urls } = require("./urls");

let previousLink = "",
  nextLink = "";

const getTicketsPerPg = async (reqBody) => {
  const cntPerPg = reqBody.perPg || 15;
  const link = reqBody.link || "";
  console.log("checking state--->>> ", previousLink, nextLink);
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
    console.log("checking state 2--->>> ", previousLink, nextLink);

    return ticketsData;
  } catch (err) {
    console.log(err);
  }
  return {};
};

exports.getTicketsPerPg = getTicketsPerPg;
