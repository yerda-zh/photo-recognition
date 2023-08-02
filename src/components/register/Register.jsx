import { useState } from "react";
import './register.scss';

const Register = ({onRouteChange, loadUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

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
    fetch("https://sharptechbackend.onrender.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          setMessage('Incorrect form submission');
        }
        return (res.json());
      })
      .then((user) => {
        if (user.id) {
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
            required
          />
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
            Register
          </button>
        </div>
      </div>
      <p className="Message">{message}</p>
    </div>
  );
};

export default Register;
