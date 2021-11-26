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

  const [currPage, setCurrPage] = useState(1);

  const [singleTicketObj, setSingleTicketObj] = useState({
    singleTicketView: false,
    singleTicket: {},
  });

  function handleStateFromResError() {
    setState({
      ...state,
      errorTickets: true,
      ticketsLoading: false,
      hasMore: false,
    });
  }
  function handleStateUpdateFromRes(res) {
    if (res) {
      setState({
        ...state,
        tickets: res.tickets,
        ticketsLoading: false,
        hasMore: res.meta ? res.meta.has_more : true,
        errorTickets: false,
      });
    } else {
      handleStateFromResError();
    }
  }

  function handleCurrentPage(type = "") {
    if (type === "prev") {
      setCurrPage(currPage - 1);
    }
    if (type === "next") {
      setCurrPage(currPage + 1);
    }
  }

  function createReqURL(type = "") {
    return `/api/getTickets?perPg=${TICKETS_PER_PAGE}&link=${type}`;
  }

  async function getTickets(type = "") {
    setState({ ...state, ticketsLoading: true });
    await axios
      .get(createReqURL(type))
      .then((response) => {
        handleStateUpdateFromRes(response.data);
        handleCurrentPage(type);
      })
      .catch((err) => {
        handleStateFromResError();
        console.log(err);
      });
  }

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

  useEffect(() => {
    if (state.currentPage === 1) {
      getTickets();
    }
    // eslint-disable-next-line
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
      {/* To view either list of tickets or a single ticket */}
      {!singleTicketObj.singleTicketView ? (
        <div>
          <div
            style={{
              maxWidth: "600px",
              minHeight: "615px",
              margin: "auto",
              textAlign: "center",
              padding: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Loading tickets */}
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
            {/* Rendering ticekts */}
            {state.tickets.length !== 0 &&
              !state.ticketsLoading &&
              !state.errorTickets && (
                <ListTickets
                  tickets={state.tickets}
                  handleSelectTicket={handleSelectTicket}
                />
              )}
            {/* No tickets */}
            {state.tickets.length === 0 &&
              !state.ticketsLoading &&
              !state.errorTickets && (
                <p
                  style={{
                    margin: "auto",
                    color: "#fff",
                  }}
                >
                  No Tickets Found.
                </p>
              )}
            {/* Error fetching tickets */}
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
                Error getting tickets, please try again or contact support.
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
              justifyContent: "space-between",
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
        // Single ticket component
        <SingleTicket
          ticket={singleTicketObj.singleTicket}
          closeSingleTicket={handleCloseSingleTicket}
        />
      )}
    </>
  );
};
