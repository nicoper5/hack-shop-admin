import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function CollectionCreate() {
  const navigate = useNavigate();
  const [collection, setCollection] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const token = useSelector((state) => state.token);
  const params = useParams();
  const formData = new FormData();

  formData.append("name", name);
  formData.append("img", img);

  useEffect(() => {
    const getCollection = async () => {
      const response = await axios({
        method: "get",
        baseURL: process.env.REACT_APP_API_URL,
        url: `/collections/${params.id}`,

        headers: { Authorization: `Bearer ${token}` },
      });
      const wantedCollection = response.data;
      console.log(response);
      setCollection(wantedCollection);
      setName(wantedCollection.name);
    };
    getCollection();
  }, [params, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editCollection = await axios({
        method: "patch",
        url: process.env.REACT_APP_API_URL + `/collections/${params.id}`,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(editCollection.data);
    } catch (err) {
      console.log(err);
    }
    navigate(-1);
  };
  return (
    collection && (
      <>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-12 text-start fw-bold">
              <h1 className="mt-5 fw-bold">Create Collection</h1>
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
                  Edit
                </Button>
              </Form>
              <hr />
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default CollectionCreate;
