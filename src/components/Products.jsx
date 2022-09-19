import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import NavigationTemplate from "./NavigationTemplate";
import Sidebar from "./Sidebar";

function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const token = useSelector((state) => state.token);

  const handleClick = async (product) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const response = await axios({
        method: "delete",
        baseURL: process.env.REACT_APP_API_URL,
        url: `/products/${product.id}`,
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response.data);
      const updatedProducts = await axios({
        method: "get",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/products",
      });
      setProducts(updatedProducts.data);
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: "get",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/products",
      });
      console.log(response.data);
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <>
      <NavigationTemplate />
      <Sidebar />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-10">
            <h1 className="mt-5 fw-bold">PRODUCT LIST</h1>
            <hr />
            <Link to="/products/create" className="btn btn-success">
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
                        <Button
                          variant="danger"
                          onClick={() => handleClick(product)}
                        >
                          Delete
                        </Button>
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
