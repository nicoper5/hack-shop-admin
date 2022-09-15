import Navigation from "./Navigation";
import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/orders",
      });
      console.log(response.data);
      setOrders(response.data);
    };
    getOrders();
  }, []);

  return (
    <>
      <Navigation />
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
                  <th scope="col">Price</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.createdAt}</td>
                      <td>
                        {order.firstname} {order.lastname}
                      </td>
                      <td>{order.deliveryAddress}</td>
                      <td>
                        <ul className="text-start">
                          {order.products.map((product) => (
                            <li>{product.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td>$USD 24000</td>
                      <td>{order.status}</td>
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
