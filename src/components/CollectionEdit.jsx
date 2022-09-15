import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function CollectionEdit() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const token = useSelector((state) => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createAdmin = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/admin",

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
            <h1 className="mt-5 fw-bold">Edit Collection</h1>
            <hr />
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Collection Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter First name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Collection Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last name"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
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

export default CollectionEdit;
