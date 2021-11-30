import React from "react";
import { render, screen } from "@testing-library/react";
// import { server, rest } from "../../../testServer";
import { getTicketsSuccessfulRes } from "../../../testData";
import { TicketCard } from "../TicketCard";

describe("Tickets view rendering tests: ", () => {
  it("Successfully renders ticket card", async () => {
    const handleClick = jest.fn();
    render(
      <TicketCard
        ticket={getTicketsSuccessfulRes.data.tickets[0]}
        selectTicket={handleClick}
      />
    );

    expect(screen.getByTestId("ticket-1")).toBeInTheDocument();
  });
});
