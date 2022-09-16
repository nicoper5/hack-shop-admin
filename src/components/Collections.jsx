import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Collections() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(null);

  useEffect(() => {
    const getCollections = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/collections",
      });
      console.log(response.data);
      setCollections(response.data);
    };
    getCollections();
  }, []);

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">Collections List</h1>
            <hr />
            <Button
              variant="success"
              onClick={() => navigate("/collections/create")}
            >
              New Collection
            </Button>
            <table className="table table-striped table-bordered align-middle mt-4">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">image</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {collections &&
                  collections.map((collection) => (
                    <tr key={collection.id}>
                      <td>{collection.name}</td>
                      <td>{collection.img}</td>
                      <td>{collection.slug}</td>
                      <td>
                        <Button
                          variant="primary"
                          className="mx-2"
                          onClick={() =>
                            navigate(`/collection/edit/${collection.id}`)
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

export default Collections;
