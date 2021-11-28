import React from "react";
import { render, screen } from "@testing-library/react";
import { server, rest } from "../../../testServer";
import {
  getTicketSuccessfulRes,
  getTicketUnSuccessfulRes,
} from "../../../testData";
import { SingleTicket } from "../SingleTicket";

describe("Ticket view rendering tests: ", () => {
  it("Successfully renders ticket", async () => {
    render(<SingleTicket ticket={getTicketSuccessfulRes.data.ticket} />);
    expect(await screen.findByTestId("ticket-subject")).toBeInTheDocument();
    expect(
      await screen.findByText("Sample ticket: Meet the ticket")
    ).toBeInTheDocument();
  });

  it("Handles errors and displays error message when error in fetching ticket", async () => {
    server.use(
      rest.get("http://localhost/api/getTicketByID", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketUnSuccessfulRes.status),
          ctx.json(getTicketUnSuccessfulRes)
        );
      })
    );
    render(<SingleTicket />);

    expect(await screen.findByTestId("ticket-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Not Found: Ticket not found, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
});
