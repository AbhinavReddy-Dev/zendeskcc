const axios = require('axios');
const { userName, password } = require('../config');
const { urls } = require('./urls');



const getTicketsPerPg = async (reqBody) => {

    const cntPerPg = reqBody.perPg || 25;
    const pgNo = reqBody.pg || 0;

    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    const data = await axios.get(`${urls.getTickets}?page[size]=${cntPerPg}`, formData, headers);

    return data;
}

exports.getTicketsPerPg = getTicketsPerPg