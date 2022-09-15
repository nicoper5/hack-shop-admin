import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AdminEdit() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createAdmin = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/admin",
        data: {
          firstname,
          lastname,
          email,
          password,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(createAdmin.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12 text-start fw-bold">
            <h1 className="mt-5 fw-bold">Create Admin</h1>
            <hr />
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter First name"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last name"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter E-Mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label className="text-start">Password</Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="Enter E-Mail"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Create
              </Button>
            </Form>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEdit;
