const {
  createTicketsURL,
  getTicketByID,
  getTicketsPerPg,
} = require("./getTickets");
const { userName, password } = require("../config");

// credentials test
describe("getTickets and getTicketByID- credentials tests: ", () => {
  it("Successful Get Tickets- returns a successful response status code when given correct credentials.", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTicketsPerPg(reqBody, userName, password);

    expect(apiResponse.status).toEqual(200);
  });

  it("Successful Get Tickets- returns a successful response status code when no credentials are passed as parameters.", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTicketsPerPg(reqBody);

    expect(apiResponse.status).toEqual(200);
  });

  it("Unsuccessful Get Tickets- returns an unsuccessful authentication response status code when given incorrect credentials.", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTicketsPerPg(reqBody, userName, "password");

    expect(apiResponse.status).toEqual(401);
  });

  it("Successful Get Ticket by ID- returns a successful response status code when given correct credentials.", async () => {
    const reqBody = {
      tcktId: 1,
    };
    const apiResponse = await getTicketByID(reqBody, userName, password);

    expect(apiResponse.status).toEqual(200);
  });

  it("Successful Get Ticket by ID- returns a successful response status code when no credentials are passed as parameters.", async () => {
    const reqBody = {
      tcktId: 1,
    };
    const apiResponse = await getTicketByID(reqBody);

    expect(apiResponse.status).toEqual(200);
  });

  it("Unsuccessful Get Ticket by ID- returns an unsuccessful authentication response status code when given incorrect credentials.", async () => {
    const reqBody = {
      tcktId: 1,
    };
    const apiResponse = await getTicketByID(reqBody, "userName", password);

    expect(apiResponse.status).toEqual(401);
  });

  it("Unsuccessful Get Ticket by ID- returns an unsuccessful response status code when no ticket id is passed.", async () => {
    const reqBody = {};
    const apiResponse = await getTicketByID(reqBody, userName, password);

    expect(apiResponse.status).toEqual(400);
  });
});

// end credentials test

// getTickets response contains next and prev links test
describe("getTickets contains links to next and prev pages tests: ", () => {
  it("Successful Get Tickets- returns a successful response that contains links to next and prev links.", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTicketsPerPg(reqBody, userName, password);

    expect(JSON.stringify(apiResponse.data.links)).toContain(
      "https://zcczendeskcc.zendesk.com/api/v2/tickets.json?page%5Bbefore%5D="
    );
    expect(JSON.stringify(apiResponse.data.links)).toContain(
      "https://zcczendeskcc.zendesk.com/api/v2/tickets.json?page%5Bafter%5D="
    );
  });
});
//end getTickets contains next and prev links test

// incorrect request body parameters
describe("getTickets and getTicketByID- request body parameters tests: ", () => {
  it("Successful Get Tickets- returns a successful response status code as 200 when given sent correct per_page parameter.", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTicketsPerPg(reqBody, userName, password);

    expect(apiResponse.status).toEqual(200);
  });

  it("Unsuccessful Get Tickets- returns an unsuccessful response status code as 400 when given incorrect per_page parameter.", async () => {
    const reqBody = {
      perPg: -1,
    };
    const apiResponse = await getTicketsPerPg(reqBody, userName, password);

    expect(apiResponse.status).toEqual(400);
  });

  it("Successful Get Ticket by ID- returns a successful response status code as 200 when given correct ticket_ID.", async () => {
    const reqBody = {
      tcktId: 1,
    };
    const apiResponse = await getTicketByID(reqBody, userName, password);

    expect(apiResponse.status).toEqual(200);
  });

  it("Unsuccessful Get Ticket by ID- returns an unsuccessful response status code as 400 when given incorrect ticket_ID.", async () => {
    const reqBody = {
      tcktId: -1,
    };
    const apiResponse = await getTicketByID(reqBody, userName, password);

    expect(apiResponse.status).toEqual(400);
  });
  it("Unsuccessful Get Ticket by ID- returns an unsuccessful response status code as 404 when given correct ticket_ID that doesn't exist.", async () => {
    const reqBody = {
      tcktId: 11111,
    };
    const apiResponse = await getTicketByID(reqBody, userName, password);

    expect(apiResponse.status).toEqual(404);
  });
});
// end incorrect parameters test

const expectedURLContains =
  "https://zcczendeskcc.zendesk.com/api/v2/tickets.json";

describe("createTicketsURL- creating urls tests: ", () => {
  it("Successful URL creation when an empty type is passed as a parameter.", async () => {
    const crtURL = createTicketsURL("", 25);
    expect(crtURL).toContain(expectedURLContains);
    const crtURL2 = createTicketsURL("next", 25);
    expect(crtURL2).toContain("after");
    const crtURL3 = createTicketsURL("prev");
    expect(crtURL3).toContain("before");
  });
});
