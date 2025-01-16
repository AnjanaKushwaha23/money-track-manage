import { useState } from "react";
import Operation from "./Operation";

const TransferMoney = ({ onLoanAmountChange }) => {
  const [loans, setLoans] = useState("");
  const handleTransfer = (e) => {
    e.preventDefault();
    console.log("Transfer submitted");
  };

  const handleLoan = (e) => {
    e.preventDefault();
    console.log("Loan requested", loans);
    onLoanAmountChange(loans);
    setLoans(""); // Clearing the input field
  };
  const handleChange = (e) => {
    setLoans(e.target.value); // Updating state in the parent (Dashboard)
  };

  const handleCloseAccount = (e) => {
    e.preventDefault();
    console.log("Account closure requested");
  };

  return (
    <>
      <Operation
        title="Transfer"
        inputs={[
          { type: "text", className: "form__input--to", label: "Transfer to" },
          { type: "number", className: "form__input--amount", label: "Amount" },
        ]}
        buttonText="→"
        onSubmit={handleTransfer}
      />

      <Operation
        title="Loan"
        inputs={[
          {
            type: "number",
            className: "form__input--loan-amount",
            label: "Amount",
            value: loans,
            onChange: handleChange,
          },
        ]}
        buttonText="→"
        onSubmit={handleLoan}
      />

      <Operation
        title="Close"
        inputs={[
          {
            type: "text",
            className: "form__input--user",
            label: "Confirm user",
          },
          {
            type: "password",
            className: "form__input--pin",
            label: "Confirm PIN",
            attributes: { maxLength: 6 },
          },
        ]}
        buttonText="→"
        onSubmit={handleCloseAccount}
      />

      <p className="logout-timer">
        You will be logged out in <span className="timer">05:00</span>
      </p>
    </>
  );
};

export default TransferMoney;
