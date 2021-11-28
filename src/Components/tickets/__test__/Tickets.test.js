import React from "react";
import { render, screen } from "@testing-library/react";
import { server, rest } from "../../../testServer";
import { Tickets } from "../Tickets";
import { ListTickets } from "../ListTickets";
import {
  getTicketsSuccessfulRes,
  getTicketsUnSuccessfulRes,
} from "../../../testData";

describe("Tickets view rendering tests: ", () => {
  it("Successfully renders tickets", async () => {
    render(<ListTickets tickets={getTicketsSuccessfulRes.data.tickets} />);

    expect(screen.getByTestId("ticket-1")).toBeInTheDocument();
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
});
