import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavigationTemplate from "./NavigationTemplate";
import Sidebar from "./Sidebar";

function AdminEdit() {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const token = useSelector((state) => state.token);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios({
        method: "get",
        baseURL: process.env.REACT_APP_API_URL,
        url: `/orders/${params.id}`,

        headers: { Authorization: `Bearer ${token}` },
      });
      const wantedOrder = response.data;
      console.log(response);
      setOrder(wantedOrder);
      setStatus(wantedOrder.status);
    };
    getOrder();
  }, [params, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "patch",
        baseURL: process.env.REACT_APP_API_URL,
        url: `/orders/change-status/${params.id}`,
        data: {
          status,
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
    order && (
      <>
        <NavigationTemplate />
        <Sidebar />
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-10 text-start fw-bold">
              <h1 className="mt-5 fw-bold">Edit Order Status</h1>
              <hr />
              <Form className="my-5" onSubmit={handleSubmit}>
                <Form.Select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Sent</option>
                  <option>Delivered</option>
                </Form.Select>
                <Button variant="success" type="submit" className="mt-4">
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
