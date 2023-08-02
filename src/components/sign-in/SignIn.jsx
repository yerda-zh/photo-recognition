import { useState } from "react";
import "./signin.scss";

const SignIn = ({onRouteChange, loadUser}) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [message, setMessage] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then((res) => {
      if (res.status === 400) {
        setMessage('Incorrect form submission');
      }
      return (res.json());
    })
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
          setMessage('');
        }
      })
    // I am fetching to the backend server, the fetch by default makes GET request so I have to specify to use post
    // I set method to post, and converted the object into json so that I can send it to the backend
    // then I get a response from back end. I setted up so that the backend would send json response
    // which contains success in a case of successful sign in. I am using that json response and converting it an object
    // using res.json(). the data i get from that I am checking whether the sign in was successful
    // so that the user can sign in
  };
  return (
    <div className="SignInContainer">
      <div className="SignInDiv">
        <h1>Sign In</h1>
        <div className="formInput">
          <p>Email</p>
          <input
            placeholder="Enter Email"
            type="email"
            name="email-address"
            id="email-address"
            onChange={onEmailChange}
            required
          />
          <p>Password</p>
          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
            onChange={onPasswordChange}
            required
          />
          <button type="submit" onClick={onSubmitSignIn}>
            Sign In
          </button>
        </div>
        <button className="Register" onClick={() => onRouteChange("register")}>
          Register
        </button>
      </div>
      <p className="Message">{message}</p>
    </div>
  );
};

export default SignIn;
