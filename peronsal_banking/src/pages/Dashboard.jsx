import { useState, useContext } from "react";
import BalanceHeader from "../components/BalanceHeader";
import Transactions from "../components/Transactions";
import TransferMoney from "../components/TransferMoney";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [loanAmount, setLoanAmount] = useState([]);

  const handleLoanAmountChange = (amount) => {
    const newMovement = {
      type: "Loan",
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };

    // Update the movements for the logged-in user
    const updatedUser = {
      ...loggedInUser,
      currentAmount: loggedInUser.currentAmount + parseFloat(amount),
      movements: [...(loggedInUser.movements || []), newMovement],
    };

    // Update the user data in context
    setLoggedInUser(updatedUser);
  };

  // Calculate total deposit from loanAmount (this should be updated dynamically)
  const totalDeposit = loanAmount.reduce(
    (sum, movement) => sum + movement.amount,
    0
  );

  // Show a loading message or redirect if no user is logged in
  if (!loggedInUser) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="app">
      <BalanceHeader
        balance={loggedInUser.currentAmount}
        currency={loggedInUser.currency}
        totalDeposit={totalDeposit} // Pass totalDeposit here
      />
      <Transactions deposit={loggedInUser.movements || []} />
      <TransferMoney onLoanAmountChange={handleLoanAmountChange} />
    </div>
  );
};

export default Dashboard;
