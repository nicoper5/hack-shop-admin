import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import { Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminCreate() {
  const navigate = useNavigate();

  const [collections, setCollections] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");

  const token = useSelector((state) => state.token);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("category", category);

  useEffect(() => {
    const getData = async () => {
      const response = await axios({
        method: "get",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/collections",
      });
      setCollections(response.data);
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createAdmin = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/admin",
        data: FormData,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(createAdmin.data);
    } catch (err) {
      console.log(err);
    }
    navigate(-1);
  };
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12 text-start fw-bold">
            <h1 className="mt-5 fw-bold">Add a New Product</h1>
            <hr />
            <Form className="my-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <InputGroup.Text id="basic-addon1">USD</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-start">Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="In stock"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-start">Collection</Form.Label>
                <Form.Select
                  aria-label="category selection"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Choose from the existing collections</option>
                  {collections &&
                    collections.map((collection) => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name}
                      </option>
                    ))}
                </Form.Select>
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

export default AdminCreate;
