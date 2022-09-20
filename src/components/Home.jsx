import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import NavigationTemplate from "./NavigationTemplate";

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
      <NavigationTemplate />
      <Sidebar />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-10">
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
                        <Link to={`/orders/edit/${order.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="25px"
                          >
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                          </svg>
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
