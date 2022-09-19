import Navigation from "./Navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import NavigationTemplate from "./NavigationTemplate";

function Home() {
  const [orders, setOrders] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/orders",
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
      setOrders(response.data);
    };
    getOrders();
  }, [token]);

  return (
    <>
      <Navigation />
      {/* <NavigationTemplate /> */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">ORDERS LIST</h1>
            <hr />
            <table className="table table-striped table-bordered align-middle mt-4">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Delivery Address</th>
                  <th scope="col">Product List</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Modify Status</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.createdAt}</td>
                      <td>
                        {order.firstname} {order.lastname}
                      </td>
                      <td>{order.deliveryAddress}</td>
                      <td>
                        <ul className="text-start">
                          {order.products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td>$USD {order.total}</td>
                      <td>{order.status}</td>
                      <td>
                        <Link
                          to={`/orders/edit/${order.id}`}
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
