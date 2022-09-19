import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeToken } from "../redux/adminSlice";
import NavigationTemplate from "./NavigationTemplate";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios({
      method: "post",
      baseURL: process.env.REACT_APP_API_URL,
      url: `/admin-login`,
      data: {
        email,
        password,
      },
    });
    dispatch(storeToken(response.data));
    console.log(response.data);

    navigate("/");
  };

  return (
    <>
      <NavigationTemplate />
      <div className="container">
        <div>
          <h1 className="mt-5 fw-bold">Admin Login</h1>
          <hr />
          <div className="text-start fw-bold">
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default Login;
