import { rest } from "msw";
import { setupServer } from "msw/node";
import { getTicketsSuccessfulRes, getTicketSuccessfulRes } from "./testData";

// Test Server
const server = setupServer(
  rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getTicketsSuccessfulRes));
  }),
  rest.get("http://localhost/api/getTicketByID", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getTicketSuccessfulRes));
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "You must add request handler." })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
