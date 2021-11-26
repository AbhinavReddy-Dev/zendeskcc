import React, { useEffect, useState } from "react";

export const TicketCard = ({ ticket = {}, selectTicket }) => {
  const [ticketState, setTicketState] = useState({});

  useEffect(() => {
    setTicketState(ticket);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "5px 10px",
        textAlign: "left",
        maxWidth: "100%",
        borderRadius: "5px",
        margin: "2px 0",
        backgroundColor: "#3D2C8D",
        cursor: "pointer",
      }}
      onClick={() => selectTicket(ticketState)}
    >
      <p style={{ color: "#fff", width: "25px" }}> {ticketState.id}</p>
      <p
        style={{
          color: "#fff",
          width: "60px",
          fontStyle: "oblique",
          textAlign: "center",
        }}
      >
        {ticketState.status}
      </p>

      <p style={{ color: "#fff", width: "65%" }}> {ticketState.subject}</p>
      <p style={{ color: "#fff", fontSize: "12px", maxWidth: "100px" }}>
        {new Date(ticketState.created_at).toDateString().slice(3)}
      </p>
    </div>
  );
};
