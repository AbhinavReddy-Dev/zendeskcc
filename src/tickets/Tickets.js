/* eslint-disable jsx-a11y/accessible-emoji */
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../App.css";
import { ListTickets } from "./ListTickets";
import { SingleTicket } from "./SingleTicket";

export const Tickets = () => {
  const TICKETS_PER_PAGE = 10;

  const [state, setState] = useState({
    tickets: [],
    hasMore: true,
    currentPage: 1,

    ticketsLoading: false,
    errorTickets: false,
  });

  const [singleTicketObj, setSingleTicketObj] = useState({
    singleTicketView: false,
    singleTicket: {},
  });

  function setStateFromRes(res) {
    // console.log(res.tickets);
    if (res.tickets) {
      setState({
        ...state,
        tickets: res.tickets,
        ticketsLoading: false,
        hasMore: res.meta ? res.meta.has_more : true,
        errorTickets: false,
      });
    } else {
      setState({
        ...state,
        errorTickets: true,
        ticketsLoading: false,
        hasMore: false,
      });
    }
  }

  const [currPage, setCurrPage] = useState(1);

  function handleSelectTicket(tckt) {
    setSingleTicketObj({
      ...singleTicketObj,
      singleTicket: tckt,
      singleTicketView: true,
    });
  }

  function handleCloseSingleTicket() {
    setSingleTicketObj({
      ...singleTicketObj,
      singleTicket: {},
      singleTicketView: false,
    });
  }

  function getReqURL(type = "") {
    return `/api/getTickets?perPg=${TICKETS_PER_PAGE}&link=${type}`;
  }

  async function getTickets(type = "") {
    setState({ ...state, ticketsLoading: true });
    await axios
      .get(getReqURL(type))
      .then((response) => {
        setStateFromRes(response.data);
        // console.log(response.data);
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
    // console.log("hit");
  }, []);

  return (
    <>
      <h1
        style={{
          color: "#fff",
          fontWeight: "normal",
        }}
      >
        Tickets
      </h1>
      {!singleTicketObj.singleTicketView ? (
        <div>
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
            {state.tickets.length !== 0 && state.ticketsLoading === false && (
              <ListTickets
                tickets={state.tickets}
                handleSelectTicket={handleSelectTicket}
              />
            )}
            {state.ticketsLoading === true && (
              <p
                style={{
                  margin: "auto",
                  color: "#fff",
                }}
              >
                Loading tickets...
              </p>
            )}
            {state.errorTickets === true && state.ticketsLoading === false ? (
              <p
                style={{
                  margin: "auto",
                  color: "#fff",
                  fontStyle: "oblique",
                }}
              >
                <span role="img" aria-label="warning">
                  ⚠️
                </span>
                Error getting tickets, please try again or contact help.
              </p>
            ) : (
              ""
            )}
          </div>
          {/* Pagination Controls */}
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
      ) : (
        <SingleTicket
          ticket={singleTicketObj.singleTicket}
          closeSingleTicket={handleCloseSingleTicket}
        />
      )}
    </>
  );
};
