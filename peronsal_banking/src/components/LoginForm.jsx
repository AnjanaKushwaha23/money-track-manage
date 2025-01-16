import { useState, useContext } from "react";
import "./LoginForm.css";
import { userData, images } from "../assets/asset.js";
import { UserContext } from "../context/UserContext";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [userPin, setUserPin] = useState("");
  const { setLoggedInUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find(
      (user) => user.name === userName && user.pin === userPin
    );
    if (user) {
      console.log("Login successful");
      setLoggedInUser(user);
    } else {
      console.log("Invalid username or pin");
    }
  };

  return (
    <nav>
      <p className="welcome">Log in to get started</p>
      <img src={images.logo} alt="Logo" className="logo" />
      <form className="login" onSubmit={handleLogin}>
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
        <button className="login__btn">&rarr;</button>
      </form>
    </nav>
  );
};

export default LoginForm;
