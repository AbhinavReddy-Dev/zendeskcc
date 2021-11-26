import React, { useEffect, useState } from "react";
import { TicketCard } from "./TicketCard";

export const ListTickets = ({ tickets, handleSelectTicket }) => {
  const [stateTickets, setStateTickets] = useState([]);

  useEffect(() => {
    setStateTickets(tickets);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {stateTickets.map((ticket, index) => (
        <TicketCard
          ticket={ticket}
          key={index}
          selectTicket={handleSelectTicket}
        />
      ))}
    </>
  );
};
