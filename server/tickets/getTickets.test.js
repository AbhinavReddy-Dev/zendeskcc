const getTickets = require("./getTickets");

const { userName, password } = require("../config");

describe("getTickets and getTicketByID- credentials test suite: ", () => {
  it("Successful Get Tickets- returns a successful response status code when given correct credentials:", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTickets.getTicketsPerPg(
      reqBody,
      userName,
      password
    );

    expect(apiResponse.status).toEqual(200);
  });

  it("Unsuccessful Get Tickets- returns an unsuccessful response status code when given incorrect credentials:", async () => {
    const reqBody = {
      perPg: 25,
    };
    const apiResponse = await getTickets.getTicketsPerPg(
      reqBody,
      userName,
      "password"
    );

    expect(apiResponse.status).toEqual(401);
  });

  it("Successful Get Ticket by ID- returns a successful response status code when given correct credentials:", async () => {
    const reqBody = {
      tcktId: 1,
    };
    const apiResponse = await getTickets.getTicketByID(
      reqBody,
      userName,
      password
    );

    expect(apiResponse.status).toEqual(200);
  });

  it("Unsuccessful Get Ticket by ID- returns an unsuccessful response status code when given incorrect credentials:", async () => {
    const reqBody = {
      tcktId: 1,
    };
    const apiResponse = await getTickets.getTicketByID(
      reqBody,
      "userName",
      password
    );

    expect(apiResponse.status).toEqual(401);
  });
});

const expectedURLContains =
  "https://zcczendeskcc.zendesk.com/api/v2/tickets.json";

describe("createTicketsURL- creating urls test suite: ", () => {
  it("Successful URL creation when an empty type is passed as a parameter:", async () => {
    const crtURL = getTickets.createTicketsURL("", 25);
    expect(crtURL).toContain(expectedURLContains);
  });
});
