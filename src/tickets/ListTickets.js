import React, { useEffect, useState } from "react";
import { TicketCard } from "./TicketCard";

export const ListTickets = ({ tickets, handleSelectTicket }) => {
  const [stateTickets, setStateTickets] = useState([]);

  useEffect(() => {
    setStateTickets(tickets);
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
