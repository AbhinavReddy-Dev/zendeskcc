import React from "react";
import { Tickets } from "./Tickets";

export const TicketCard = ({ ticket = {}, setCurrentTicket }) => {
  //   console.log(ticket);
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
    >
      <p style={{ color: "#fff", width: "20px" }}> {ticket.id}</p>
      <p style={{ color: "#fff", width: "40px" }}> {ticket.status}</p>
      <p style={{ color: "#fff", width: "50%" }}> {ticket.subject}</p>
      <div style={{ width: "100px" }}>
        {ticket.tags
          ? ticket.tags.splice(0, 3).map((tag, i) => (
              <p
                key={i}
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  padding: "2px 4px",
                  margin: "2px",
                  backgroundColor: "#916BBF",
                  height: "fit-content",
                  width: "fit-content",

                  borderRadius: "5px",
                }}
              >
                {" "}
                {tag}
              </p>
            ))
          : "No Tags"}
      </div>
    </div>
  );
};
