import React, { useState, useEffect, useContext } from "react";
import "./BalanceHeader.css";
import { UserContext } from "../context/UserContext";

const BalanceHeader = ({ totalDeposit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000); // Update every 24 hours

    return () => clearInterval(intervalId);
  }, []);

  // Format the date
  const formattedDate = currentDate.toLocaleDateString();

  // Check if loggedInUser exists
  if (!loggedInUser) {
    return <div className="balance">Please log in to view your balance.</div>;
  }

  // Calculate the total balance (current amount + deposit)
  const totalBalance = loggedInUser.currentAmount + totalDeposit;

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">{formattedDate}</span>
        </p>
      </div>
      <p className="balance__value">
        {totalBalance} {loggedInUser.currency}
      </p>
    </div>
  );
};

export default BalanceHeader;
