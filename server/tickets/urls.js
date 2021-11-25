const subDomain = "zcczendeskcc";

const urls = {
  getTickets: `https://${subDomain}.zendesk.com/api/v2/tickets.json`,
  getTicketByID: (id) => {
    // console.log(`https://${subDomain}.zendesk.com/api/v2/ticket/${id}.json`);
    return `https://${subDomain}.zendesk.com/api/v2/tickets/${id}.json`;
  },
};

exports.urls = urls;
