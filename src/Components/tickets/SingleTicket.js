import axios from "axios";
import React, { useEffect, useState } from "react";

export const SingleTicket = ({ ticket = {}, closeSingleTicket }) => {
  const [singleTicket, setSingleTicket] = useState({});
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [errorLoadingTicket, setErrorLoadingTicket] = useState({
    bool: false,
    message: "",
  });

  function handleErrorMessage(response) {
    const helperErrorText = ", please try again or contact support.";

    switch (response.status) {
      case 401:
        return (
          response.statusText + ": Couldn't authenticate you" + helperErrorText
        );
      case 404:
        return response.statusText + ": Ticket not found" + helperErrorText;
      case 400:
        return response.statusText + ": Invalid Ticket Id" + helperErrorText;
      default:
        return response.statusText + helperErrorText;
    }
  }

  function handleStateUpdateFromRes(res) {
    setSingleTicket(res.data.ticket);
  }

  useEffect(() => {
    async function getTicketByID(id = null) {
      setLoadingTicket(true);
      await axios
        .get(`/api/getTicketByID?tcktId=${id}`)
        .then((response) => {
          handleStateUpdateFromRes(response.data);
        })
        .catch((err) => {
          setErrorLoadingTicket({
            bool: true,
            message: handleErrorMessage(err.response),
          });
        });

      setLoadingTicket(false);
    }
    getTicketByID(ticket.id);
    return setSingleTicket({});
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        minHeight: "615px",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        borderRadius: "5px",
        margin: "auto",
        backgroundColor: "#3D2C8D",
        position: "relative",
      }}
    >
      <button
        type="button"
        style={{
          backgroundColor: "#fafefa",
          color: "#3f3f3f",
          border: "none",
          borderRadius: "15px",
          width: "fit-content",
          position: "absolute",
          top: "10px",
          right: "10px",
          margin: "0px",
          padding: "2px 5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={closeSingleTicket}
        data-testid="close-button"
      >
        X
      </button>
      {loadingTicket && !errorLoadingTicket.bool ? (
        <p
          style={{
            margin: "auto",
            color: "#fff",
          }}
        >
          Loading ticket...
        </p>
      ) : !loadingTicket && errorLoadingTicket.bool ? (
        <p
          style={{
            margin: "auto",
            color: "#fff",
            fontStyle: "oblique",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
          data-testid={"ticket-error"}
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
          {errorLoadingTicket.message}
        </p>
      ) : (
        !loadingTicket &&
        !errorLoadingTicket.bool && (
          <div
            style={{
              padding: "10px 15px",
            }}
          >
            <p name="ticketID" style={{ color: "#fff", width: "20px" }}>
              {singleTicket.id}
            </p>
            <p style={{ color: "#fff", width: "40px", fontStyle: "oblique" }}>
              {singleTicket.status}
            </p>
            <p
              style={{ color: "#fff", width: "70%" }}
              data-testid={"ticket-subject"}
            >
              {singleTicket.subject}
            </p>
            <p style={{ color: "#fff", maxWidth: "100%" }}>
              {singleTicket.description}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {singleTicket.tags &&
                singleTicket.tags.splice(0, 3).map((tag, i) => (
                  <p
                    key={i}
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      padding: "2px 4px",
                      marginRight: "5px",
                      backgroundColor: "#916BBF",
                      height: "fit-content",
                      width: "fit-content",

                      borderRadius: "5px",
                    }}
                  >
                    {tag}
                  </p>
                ))}
            </div>
            <p style={{ color: "#fff", maxWidth: "100%", fontSize: "12px" }}>
              updated:
              {new Date(singleTicket.updated_at).toDateString().slice(3)}
            </p>
            <p style={{ color: "#fff", maxWidth: "100%", fontSize: "12px" }}>
              created:
              {new Date(singleTicket.created_at).toDateString().slice(3)}
            </p>
          </div>
        )
      )}
    </div>
  );
};
