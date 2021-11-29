import React from "react";
import { render, screen } from "@testing-library/react";
import { server, rest } from "../../../testServer";
import { Tickets } from "../Tickets";
import { ListTickets } from "../ListTickets";
import {
  getTicketsSuccessfulRes,
  getTicketsUnSuccessfulRes,
  getTicketsUnSuccessfulRes2,
  getTicketsUnSuccessfulRes3,
  getTicketsUnSuccessfulRes4,
  getTicketsUnSuccessfulRes5,
} from "../../../testData";

describe("Tickets view rendering tests: ", () => {
  it("Successfully renders tickets", async () => {
    render(<ListTickets tickets={getTicketsSuccessfulRes.data.tickets} />);

    expect(screen.getByTestId("ticket-1")).toBeInTheDocument();
  });

  it("Successfully renders a message for no tickets when there are no tickets or ticekts is an empty array", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        getTicketsSuccessfulRes["data"].tickets = [];
        return res(ctx.status(200), ctx.json(getTicketsSuccessfulRes));
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-empty")).toBeInTheDocument();
  });

  it("Handles errors and displays error message when error in fetching tickets", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        return res(ctx.status(401), ctx.json(getTicketsUnSuccessfulRes));
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Unauthorized: Couldn't authenticate you, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
  it("Handles errors and displays error message when error in fetching tickets- 2", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketsUnSuccessfulRes2.status),
          ctx.json(getTicketsUnSuccessfulRes2)
        );
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Not Found: Not found, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
  it("Handles errors and displays error message when error in fetching tickets- 3", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketsUnSuccessfulRes3.status),
          ctx.json(getTicketsUnSuccessfulRes3)
        );
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Too Many Requests: Usage limit Exceeded, please contact support."
      )
    ).toBeInTheDocument();
  });
  it("Handles errors and displays error message when error in fetching tickets- 4", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketsUnSuccessfulRes4.status),
          ctx.json(getTicketsUnSuccessfulRes4)
        );
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Bad Request: Request not successful, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
  it("Handles errors and displays error message when error in fetching tickets- 5", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketsUnSuccessfulRes5.status),
          ctx.json(getTicketsUnSuccessfulRes5)
        );
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Internal Server Error, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
});
