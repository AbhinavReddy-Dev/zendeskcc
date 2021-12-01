import React from "react";

export const Button = ({ onclick, disabledBool, testId, text }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      disabled={disabledBool}
      style={{
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: "#C996CC",
        color: "#1C0C5B",
        fontSize: "14px",
        cursor: disabledBool ? "not-allowed" : "pointer",
      }}
      data-testid={testId}
    >
      {text}
    </button>
  );
};
