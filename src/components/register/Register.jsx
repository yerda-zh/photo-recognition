import { useState } from "react";
import './register.scss';

const Register = ({onRouteChange, loadUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user) {
          loadUser(user);
          onRouteChange("home");
        }
      });
    // I am fetching to the backend server, the fetch by default makes GET request so I have to specify to use post
    // I set method to post, and converted the object into json so that I can send it to the backend
    // then I get a response from back end. I setted up so that the backend would send json response
    // which contains success in a case of successful sign in. I am using that json response and converting it an object
    // using res.json(). the data i get from that I am checking whether the sign in was successful
    // so that the user can sign in
  };

  return (
    <div className="RegisterContainer">
      <div className="RegisterDiv">
        <h1>Register</h1>
        <div className="formInput">
          <p>Name</p>
          <input
            placeholder="Enter Name"
            type="text"
            name="name"
            id="name"
            onChange={onNameChange}
          />
          <p>Email</p>
          <input
            placeholder="Enter Email"
            type="email"
            name="email-address"
            id="email-address"
            onChange={onEmailChange}
          />
          <p>Password</p>
          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            id="password"
            onChange={onPasswordChange}
          />
          <button type="submit" onClick={onSubmitSignIn}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
