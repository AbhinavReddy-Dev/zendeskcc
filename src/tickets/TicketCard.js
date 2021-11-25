import React, { useEffect, useState } from "react";

export const TicketCard = ({ ticket = {}, selectTicket }) => {
  // console.log(ticket.tags);
  const [ticketState, setTicketState] = useState({});

  useEffect(() => {
    setTicketState(ticket);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "5px 10px",
        // margin:'',
        textAlign: "left",
        maxWidth: "100%",
        borderRadius: "5px",
        // border: "1px solid white",
        margin: "2px 0",
        backgroundColor: "#3D2C8D",
        cursor: "pointer",
      }}
      onClick={() => selectTicket(ticketState)}
    >
      <p style={{ color: "#fff", width: "20px" }}> {ticketState.id}</p>
      <p style={{ color: "#fff", width: "40px", fontStyle: "oblique" }}>
        {ticketState.status}
      </p>

      <p style={{ color: "#fff", width: "70%" }}> {ticketState.subject}</p>
    </div>
  );
};
