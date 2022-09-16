import Navigation from "./Navigation";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/products",
      });
      console.log(response.data);
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">PRODUCT LIST</h1>
            <hr />
            <Link to="/products/create" className="btn-green">
              New Product
            </Link>
            <table className="table table-striped table-bordered align-middle mt-4">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Product name</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Bestseller</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>{product.bestseller ? "Yes" : "No"}</td>
                      <td>
                        <Button
                          variant="primary"
                          className="mx-2"
                          onClick={() =>
                            navigate(`/products/edit/:${product.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button variant="danger">Delete</Button>
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

export default Product;
