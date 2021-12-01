/* eslint-disable jsx-a11y/accessible-emoji */
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../App.css";
import { Button } from "./Button";
import { ListTickets } from "./ListTickets";
import { SingleTicket } from "./SingleTicket";

export const Tickets = () => {
  const TICKETS_PER_PAGE = 25;

  const [state, setState] = useState({
    tickets: [],
    hasMore: true,
    currentPage: 1,
    ticketsLoading: false,
    errorTickets: false,
    errorText: "",
  });

  const [currPage, setCurrPage] = useState(1);

  const prev = () => getTickets("prev");

  const next = () => getTickets("next");

  const [singleTicketObj, setSingleTicketObj] = useState({
    singleTicketView: false,
    singleTicket: {},
  });

  function handleErrorMessage(response) {
    const helperErrorText = ", please try again or contact support.";
    switch (response.status) {
      case 401:
        return (
          response.statusText + ": Couldn't authenticate you" + helperErrorText
        );
      case 403:
        return response.statusText + helperErrorText;
      case 404:
        return response.statusText + ": Not found" + helperErrorText;
      case 429:
        return (
          response.statusText +
          ": Usage limit Exceeded, please contact support."
        );
      case 400:
        return (
          response.statusText + ": Request not successful" + helperErrorText
        );
      default:
        return response.statusText + helperErrorText;
    }
  }

  function handleStateFromResError(res) {
    setState({
      ...state,
      errorTickets: true,
      errorText: handleErrorMessage(res),
      ticketsLoading: false,
      hasMore: false,
    });
  }
  function handleStateUpdateFromRes(res) {
    setState({
      ...state,
      tickets: res.data.tickets,
      ticketsLoading: false,
      hasMore: res.data.meta && res.data.meta.has_more,
      errorTickets: false,
    });
  }

  async function getTickets(type = "") {
    setState({ ...state, ticketsLoading: true });
    await axios
      .get(`/api/getTickets?perPg=${TICKETS_PER_PAGE}&link=${type}`)
      .then((response) => {
        handleStateUpdateFromRes(response.data);
        setCurrPage(
          currPage + (type === "prev" ? -1 : type === "next" ? +1 : +0)
        );
      })
      .catch((err) => {
        handleStateFromResError(err.response);
      });
  }

  const handleSelectTicket = (tckt) => {
    setSingleTicketObj({
      ...singleTicketObj,
      singleTicket: tckt,
      singleTicketView: true,
    });
  };

  const handleCloseSingleTicket = () =>
    setSingleTicketObj({
      ...singleTicketObj,
      singleTicket: {},
      singleTicketView: false,
    });

  useEffect(() => {
    getTickets();
    return () => {
      setState({
        tickets: [],
        hasMore: true,
        currentPage: 1,
        ticketsLoading: false,
        errorTickets: false,
        errorText: "",
      });
      setCurrPage(1);
      setSingleTicketObj({
        singleTicketView: false,
        singleTicket: {},
      });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1
        style={{
          color: "#fff",
          fontWeight: "normal",
          marginBottom: "2rem",
        }}
      >
        Tickets
      </h1>
      {/* To view either list of tickets or a single ticket */}
      {!singleTicketObj.singleTicketView ? (
        <>
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
                  data-testid="tickets-empty"
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
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
                data-testid={"tickets-error"}
              >
                <span
                  role="img"
                  aria-label="warning"
                  style={{
                    marginBottom: "1rem",
                  }}
                >
                  ⚠️
                </span>
                {state.errorText}
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
              paddingBottom: "5rem",
            }}
          >
            <Button
              onclick={prev}
              disabledBool={currPage === 1}
              testId={"prev-button"}
              text={"Previous"}
            />
            <p
              style={{
                color: "#fff",
                margin: "5px 10px",
                textAlign: "center",
              }}
            >
              {currPage}
            </p>

            <Button
              onclick={next}
              disabledBool={!state.hasMore}
              testId={"next-button"}
              text={"Next"}
            />
          </div>
        </>
      ) : (
        // Single ticket component
        <SingleTicket
          data-testid="single-ticket-comp"
          ticket={singleTicketObj.singleTicket}
          closeSingleTicket={handleCloseSingleTicket}
        />
      )}
    </>
  );
};
