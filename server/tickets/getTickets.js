const axios = require("axios");
const { userName, password } = require("../config");
const { urls } = require("./urls");

const getTicketsPerPg = async (reqBody) => {
  const cntPerPg = reqBody.perPg || 25;
  // const pgNo = reqBody.pg || 0;

  const auth =
    "Basic " + new Buffer(userName + ":" + password).toString("base64");
  const headers = {
    Authorisation: "Bearer " + auth,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  // const data =
  await axios
    .get(
      `${urls.getTickets}?page[size]=${cntPerPg}`,

      {
        auth: {
          username: userName,
          password: password,
        },
      }
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  // console.log(data);
  return {};
};

exports.getTicketsPerPg = getTicketsPerPg;
