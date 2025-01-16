import "./Transactions.css";
// import { userData } from "../assets/asset.js";

const Transactions = ({ deposit, totalDeposit }) => {
  console.log(deposit);
  return (
    <>
      {/* Deposits/Loans Movements */}
      <div className="movements">
        {deposit.length > 0
          ? deposit.map((movement, index) => (
              <div className="movements__row" key={index}>
                <div className="movements__type movements__type--deposit">
                  {movement.type}
                </div>
                <div className="movements__date">{movement.date}</div>
                <div className="movements__value">{movement.amount}€</div>
              </div>
            ))
          : ""}
      </div>

      {/* Withdrawal Movements */}
      {/* <div className="movements">
        {withdrawals.length > 0 ? (
          withdrawals.map((movement, index) => (
            <div className="movements__row" key={index}>
              <div className="movements__type movements__type--withdrawal">
                {movement.type}
              </div>
              <div className="movements__date">{movement.date}</div>
              <div className="movements__value">{movement.amount}€</div>
            </div>
          ))
        ) : (
          <p>No withdrawals</p>
        )}
      </div> */}
      <div className="summary">
        <p className="summary__label">In</p>
        <p className="summary__value summary__value--in">{totalDeposit}€</p>
        <p className="summary__label">Out</p>
        <p className="summary__value summary__value--out">0000€</p>
        <p className="summary__label">Interest</p>
        <p className="summary__value summary__value--interest">0000€</p>
        <button className="btn--sort">↓ SORT</button>
      </div>
    </>
  );
};

export default Transactions;
