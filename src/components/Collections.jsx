import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../css/collections.css";
import { useSelector } from "react-redux";
import NavigationTemplate from "./NavigationTemplate";
import Sidebar from "./Sidebar";

function Collections() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(null);
  const token = useSelector((state) => state.token);

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
      <NavigationTemplate />
      <Sidebar />
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-10">
            <h1 className="mt-5 fw-bold">Collections List</h1>
            <hr />
            <Link to="/collections/create" className="btn btn-success">
              New Collection
            </Link>
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
                      <td>
                        <img
                          className="img-fluid img-card"
                          src={
                            process.env.REACT_APP_API_URL +
                            "/img/" +
                            collection.img
                          }
                          alt="Luminor Collection"
                        />
                      </td>
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
                        <Button
                          variant="danger"
                          onClick={async () => {
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
                              const collectionDeleted = await axios({
                                method: "delete",
                                baseURL: process.env.REACT_APP_API_URL,
                                url: `/collections/${collection.id}`,
                                headers: { Authorization: "Bearer " + token },
                              });
                              console.log(collectionDeleted.data);
                              const collectionUpdated = await axios({
                                method: "get",
                                url:
                                  process.env.REACT_APP_API_URL +
                                  "/collections",
                              });
                              setCollections(collectionUpdated.data);
                              Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                            }
                          }}
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

export default Collections;
