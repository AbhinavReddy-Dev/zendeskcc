// const subDomain = "zcczendeskcc";

const { domain } = require("../config");

const urls = {
  getTickets: `https://${domain}.zendesk.com/api/v2/tickets.json`,
  getTicketByID: (id) => {
    // console.log(`https://${subDomain}.zendesk.com/api/v2/ticket/${id}.json`);
    return `https://${domain}.zendesk.com/api/v2/tickets/${id}.json`;
  },
};

exports.urls = urls;
