import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  getTicketsUnSuccessfulRes6,
} from "../../../testData";
import { Button } from "../Button";

describe("Tickets view rendering tests: ", () => {
  it("Successfully renders tickets", async () => {
    render(<ListTickets tickets={getTicketsSuccessfulRes.data.tickets} />);

    expect(screen.getByTestId("ticket-1")).toBeInTheDocument();
  });

  it("Successfully simulates a click on next", async () => {
    const mockOnClick = jest.fn();

    render(
      <Button
        onclick={mockOnClick}
        testId={"next-button"}
        text={"Next"}
        disabledBool={false}
      />
    );
    userEvent.click(await screen.findByTestId("next-button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it("Successfully simulates a click on prev", async () => {
    const mockOnClick = jest.fn();
    render(
      <Button
        onclick={mockOnClick}
        testId={"prev-button"}
        text={"Previous"}
        disabledBool={false}
      />
    );
    userEvent.click(await screen.findByTestId("prev-button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Successfully simulates a click on next or prev and changes page no", async () => {
    const { rerender } = render(<Tickets />);

    userEvent.click(await screen.findByTestId("next-button"));
    rerender(<Tickets />);

    expect(await screen.findByTestId("ticket-27")).toBeInTheDocument();
    expect((await screen.findByTestId("page-no")).innerHTML).toEqual("2");

    userEvent.click(await screen.findByTestId("prev-button"));
    rerender(<Tickets />);

    expect(await screen.findByTestId("ticket-2")).toBeInTheDocument();
    expect((await screen.findByTestId("page-no")).innerHTML).toEqual("1");
  });

  it("Successfully simulates a click on a ticket card", async () => {
    const { rerender } = render(<Tickets />);

    userEvent.click(await screen.findByTestId("ticket-1"));

    rerender(<Tickets />);
    const closeButton = await screen.findByTestId("close-button");
    expect(closeButton).toBeInTheDocument();

    rerender(<Tickets />);
    userEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
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
        "Service Unavailable, please try again or contact support."
      )
    ).toBeInTheDocument();
  });
  it("Handles errors and displays error message when error in fetching tickets- 6", async () => {
    server.use(
      rest.get("http://localhost/api/getTickets", (_req, res, ctx) => {
        return res(
          ctx.status(getTicketsUnSuccessfulRes6.status),
          ctx.json(getTicketsUnSuccessfulRes6)
        );
      })
    );
    render(<Tickets />);

    expect(await screen.findByTestId("tickets-error")).toBeInTheDocument();
    expect(
      await screen.findByText("Forbidden, please try again or contact support.")
    ).toBeInTheDocument();
  });
});
