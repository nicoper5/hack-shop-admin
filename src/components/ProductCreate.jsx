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
  const [bestseller, setBestseller] = useState(false);
  const [image, setImage] = useState("");
  const [imageBack, setImageBack] = useState("");

  const token = useSelector((state) => state.token);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("category", category);
  formData.append("bestseller", bestseller);
  formData.append("image", image);
  formData.append("imageBack", imageBack);

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
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/products",
        data: FormData,
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
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

              <Form.Group className="mb-3">
                <Form.Label className="text-start">
                  Set product as bestseller?
                </Form.Label>
                <div onChange={(e) => setBestseller(e.target.value)}>
                  <Form.Check
                    inline
                    label="Yes"
                    name="bestseller"
                    type="radio"
                    id={`inline-1`}
                    value={true}
                  />
                  <Form.Check
                    inline
                    label="No"
                    name="bestseller"
                    type="radio"
                    id={`inline-2`}
                    value={false}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Front picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    console.log(formData);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Back picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setImageBack(e.target.files[0]);
                  }}
                />
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
