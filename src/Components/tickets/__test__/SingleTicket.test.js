import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { server, rest } from "../../../testServer";
import {
  getTicketSuccessfulRes,
  getTicketUnSuccessfulRes,
  getTicketUnSuccessfulRes2,
  getTicketUnSuccessfulRes3,
  getTicketUnSuccessfulRes4,
} from "../../../testData";
import { SingleTicket } from "../SingleTicket";

describe("Ticket view rendering tests: ", () => {
  it("Successfully renders ticket", async () => {
    act(() => {
      render(<SingleTicket ticket={getTicketSuccessfulRes.data.ticket} />);
    });
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

  it("Handles errors and displays error message when error in fetching ticket- 2 ", async () => {
    server.use(
      rest.get("http://localhost/api/getTicketByID", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketUnSuccessfulRes2.status),
          ctx.json(getTicketUnSuccessfulRes2)
        );
      })
    );
    render(<SingleTicket />);
    expect(
      await screen.findByText(
        "Unauthorized: Couldn't authenticate you, please try again or contact support."
      )
    ).toBeInTheDocument();
  });

  it("Handles errors and displays error message when error in fetching ticket- 3 ", async () => {
    server.use(
      rest.get("http://localhost/api/getTicketByID", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketUnSuccessfulRes3.status),
          ctx.json(getTicketUnSuccessfulRes3)
        );
      })
    );
    render(<SingleTicket />);
    expect(await screen.findByTestId("ticket-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Bad Request: Invalid Ticket Id, please try again or contact support."
      )
    ).toBeInTheDocument();
  });

  it("Handles errors and displays error message when error in fetching ticket- 4 ", async () => {
    server.use(
      rest.get("http://localhost/api/getTicketByID", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketUnSuccessfulRes4.status),
          ctx.json(getTicketUnSuccessfulRes4)
        );
      })
    );
    render(<SingleTicket />);
    expect(await screen.findByTestId("ticket-error")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Internal Server Error, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
});
