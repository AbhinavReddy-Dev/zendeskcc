const subDomain = 'zcczendeskcc';

const urls = {

    getTickets : `https://${subDomain}.zendesk.com/api/v2/tickets.json`,
    getTicketByID : (id) => `https://${subDomain}.zendesk.com/api/v2/ticket/${id}.json`,
    
}

exports.urls = urls;