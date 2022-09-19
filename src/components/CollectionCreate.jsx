import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationTemplate from "./NavigationTemplate";
import Sidebar from "./Sidebar";

function CollectionCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const token = useSelector((state) => state.token);
  const formData = new FormData();

  formData.append("name", name);
  formData.append("img", img);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createCollection = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/collections",
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(createCollection.data);
    } catch (err) {
      console.log(err);
    }
    navigate(-1);
  };
  return (
    <>
      <NavigationTemplate />
      <Sidebar />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-10 text-start fw-bold">
            <h1 className="mt-5 fw-bold">Edit Collection</h1>
            <hr />
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Collection Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Collection name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Label>Collection Image</Form.Label>
              <input
                placeholder="Collection image"
                type="file"
                className="form-control mb-4"
                id="collection-image"
                name="collection-image"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
              />

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

export default CollectionCreate;
