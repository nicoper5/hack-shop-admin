import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavigationTemplate from "./NavigationTemplate";
import Sidebar from "./Sidebar";

function AdminEdit() {
  const [admin, setAdmin] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const token = useSelector((state) => state.token);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAdmin = async () => {
      const response = await axios({
        method: "get",
        baseURL: process.env.REACT_APP_API_URL,
        url: `/admin/${params.id}`,

        headers: { Authorization: `Bearer ${token}` },
      });
      const wantedAdmin = response.data;
      console.log(response);
      setAdmin(wantedAdmin);
      setFirstname(wantedAdmin.firstname);
      setLastname(wantedAdmin.lastname);
      setEmail(wantedAdmin.email);
    };
    getAdmin();
  }, [params, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "patch",
        baseURL: process.env.REACT_APP_API_URL,
        url: `/admin/${params.id}`,
        data: {
          firstname,
          lastname,
          email,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    navigate(-1);
  };
  return (
    admin && (
      <>
        <NavigationTemplate />
        <Sidebar />
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-10 text-start fw-bold">
              <h1 className="mt-5 fw-bold">Edit Admin</h1>
              <hr />
              <Form className="my-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First name"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
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

                <Form.Group className="mb-3">
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

                <Button variant="success" type="submit">
                  Update
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

export default AdminEdit;
