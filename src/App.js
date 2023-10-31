import { useState } from "react";
const account = [
  {
    owner: "Anjana Kushwaha",
    user: "AK",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: "Mayank Kushwaha",
    user: "MK",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
];

function App() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountdrawn, setAmountDrwan] = useState(0);
  const [newList, setNewList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPin, setUserPin] = useState();
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("Log in to get started");
  const [loginedIn, setLoginedIn] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    const newAdditionAmount = Number(amount);
    // setNewList(newAdditionAmount);
    setNewList((prevList) => [...prevList, newAdditionAmount]);
    setAmount([]);
  }
  function handleSubmitwithdrawal(e) {
    e.preventDefault();
    const newWithDrawalAmount = Number(amountdrawn);
    setNewList((prevList) => [...prevList, -newWithDrawalAmount]);
    setAmountDrwan([]);
  }

  function handleLogin(e) {
    e.preventDefault();
    const userIndex = account.findIndex(
      (user) => userName === user.user && Number(userPin) === user.pin
    );
    const user = account[userIndex];
    if (userIndex !== -1) {
      setDisplay(true);
      setUserName("");
      setUserPin("");
      setText(`Welcome ${user.owner}`);
      setLoginedIn(userIndex);
    } else {
      alert("Please check the user Id and Pin");
    }
  }

  return (
    <>
      <Navbar
        userName={userName}
        setUserName={setUserName}
        userPin={userPin}
        setUserPin={setUserPin}
        onLogin={handleLogin}
        text={text}
        display={display}
        setDisplay={setDisplay}
        setText={setText}
      />
      <div className={display ? "show" : "hide"}>
        <div className="main-container">
          <CurrentBalance totalBalance={totalBalance} />
        </div>
        <div className="display bank_account">
          <div className="passbook">
            <TransitionDetails
              setTotalBalance={setTotalBalance}
              newList={newList}
              loginedIn={loginedIn}
            />
          </div>
          <div className="activity display">
            <Deposit
              amount={amount}
              setAmount={setAmount}
              handleSubmit={handleSubmit}
            />
            <WithDraw
              onSubmitwithdrawal={handleSubmitwithdrawal}
              amountdrawn={amountdrawn}
              setAmountDrwan={setAmountDrwan}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function CurrentBalance({ totalBalance }) {
  const date = new Date();
  const showDate = date.toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="display">
      <div>
        <p className="current">Current balance</p>
        <p className="currentTime">As of {showDate}</p>
      </div>
      {
        <div>
          <p className="balance_amount">{totalBalance}$</p>
        </div>
      }
    </div>
  );
}

// function TransitionDetails({ newList, setTotalBalance }) {
//   return (
//     <ul className="movements_list">
//       {account.map((ele, index) => (
//         <TransitionList
//           movements={ele.movements}
//           setTotalBalance={setTotalBalance}
//           key={index}
//           newList={newList}
//         />
//       ))}
//     </ul>
//   );
// }

function TransitionDetails({ newList, setTotalBalance, loginedIn }) {
  return (
    <ul className="movements_list">
      {loginedIn !== null && (
        <TransitionList
          movements={account[loginedIn].movements} // Access the logged-in user's movements
          setTotalBalance={setTotalBalance}
          key={account[loginedIn].pin} // Use the unique PIN as the key
          newList={newList}
        />
      )}
    </ul>
  );
}

function TransitionList({ movements, setTotalBalance, newList }) {
  const newMove = [...movements, ...newList];
  let total = 0;
  newMove.forEach((items) => {
    total += items;
  });
  console.log(newMove, total);
  return (
    <div>
      <div className="movements">
        {newMove.map((items, index) => (
          <div className="movements_data display" key={index}>
            <div className={items > 0 ? "green" : "red"}>
              {items > 0 ? "Deposit" : "Withdrawal"}
            </div>
            <li>{items}$</li>
          </div>
        ))}
      </div>
      {setTotalBalance(total)}
    </div>
  );
}

function Deposit({ setAmount, amount, handleSubmit }) {
  return (
    <div className="addoperation">
      <p>Enter Amount</p>
      <form className="display" onSubmit={handleSubmit}>
        <input
          type="number"
          min="10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <span>
          <ArrowButton />
        </span>
      </form>
    </div>
  );
}

function WithDraw({ onSubmitwithdrawal, setAmountDrwan, amountdrawn }) {
  return (
    <div className="reduceoperation">
      <p>Amount Withdrawal</p>
      <form className="display" onSubmit={onSubmitwithdrawal}>
        <input
          type="number"
          // max="-10"
          value={amountdrawn}
          onChange={(e) => setAmountDrwan(e.target.value)}
        />
        <span>
          <ArrowButton />
        </span>
      </form>
    </div>
  );
}
export default App;
function ArrowButton({ btnText }) {
  return <button className="button">{btnText}&rarr;</button>;
}

function Navbar({
  userName,
  setUserName,
  userPin,
  setUserPin,
  onLogin,
  text,
  display,
  setDisplay,
  setText
}) {
  return (
    <nav>
      <p className="welcome">{text}</p>
      <button
        className={display ? "show logout" : "hide"}
        onClick={() => {setDisplay(false); setText("Log in to get started")}}
      >
        Logout
      </button>
      <form className={display ? "hide" : "show login"} onSubmit={onLogin}>
        <input
          type="text"
          placeholder="user"
          className="login__input login__input--user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="PIN"
          maxLength="4"
          className="login__input login__input--pin"
          value={userPin}
          onChange={(e) => setUserPin(e.target.value)}
        />
        <ArrowButton />
      </form>
    </nav>
  );
}
