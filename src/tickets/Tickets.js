import axios from "axios";
import React, { useState, useEffect } from "react";
import "../App.css";

import { TicketCard } from "./TicketCard";

export const Tickets = () => {
  const TICKETS_PER_PAGE = 10;

  const [state, setState] = useState({
    tickets: [],
    prevLink: "",
    nextLink: "",
    prev: "",
    next: "",
    hasMore: true,
    currentPage: 1,
    currentTicket: {},
    ticketsLoading: false,
  });

  function setStateFromRes(res) {
    setState({
      ...state,
      tickets: res.tickets,
      prev: res.meta ? res.meta.before_cursor : "",
      next: res.meta ? res.meta.after_cursor : "",
      prevLink: res.links ? res.links.prev : "",
      nextLink: res.links ? res.links.next : "",
      ticketsLoading: false,
      hasMore: res.meta ? res.meta.has_more : true,
    });
  }

  const [currPage, setCurrPage] = useState(1);

  function getReqURL(type = "") {
    return `/api/getTickets?perPg=${TICKETS_PER_PAGE}&link=${type}`;
  }

  async function getTickets(type = "") {
    setState({ ...state, ticketsLoading: true });
    await axios
      .get(getReqURL(type))
      .then((response) => {
        setStateFromRes(response.data);
        console.log(response.data);
        if (type === "prev") {
          setCurrPage(currPage - 1);
        }
        if (type === "next") {
          setCurrPage(currPage + 1);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (state.currentPage === 1) {
      getTickets();
    }
    console.log("hit");
  }, []);

  return (
    <div>
      <h1
        style={{
          color: "#fff",
          fontWeight: "normal",
        }}
      >
        Tickets
      </h1>
      <div
        style={{
          maxWidth: "600px",
          minHeight: "615px",
          margin: "auto",
          // border: "1px solid lightblue",
          textAlign: "center",
          padding: "auto",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
        }}
      >
        {state.ticketsLoading === false && state.tickets !== [] ? (
          state.tickets.map((ticket, index) => (
            <TicketCard ticket={ticket} key={index} />
          ))
        ) : (
          <p
            style={{
              margin: "auto",
              color: "#fff",
            }}
          >
            Loading tickets...
          </p>
        )}
      </div>
      <div
        style={{
          margin: " 20px auto",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "row",
          // width: "100%",
          justifyContent: "space-between",
          // border: "1px solid lightblue",
          height: "fit-content",
        }}
      >
        <button
          type="button"
          disabled={currPage === 1}
          onClick={() => {
            getTickets("prev");
          }}
          style={{
            border: "none",
            padding: "5px 7px",
            borderRadius: "5px",
            backgroundColor: "#C996CC",
            color: "#1C0C5B",
            fontSize: "14px",
            cursor: currPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <p
          style={{
            color: "#fff",
            margin: "5px 10px",
            textAlign: "center",
          }}
        >
          {currPage}
        </p>
        <button
          type="buton"
          onClick={() => {
            getTickets("next");
          }}
          disabled={!state.hasMore}
          style={{
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            backgroundColor: "#C996CC",
            color: "#1C0C5B",
            fontSize: "14px",
            cursor: !state.hasMore ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
