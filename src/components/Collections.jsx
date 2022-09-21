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
                            process.env.REACT_APP_STORAGE_URL + collection.img
                          }
                          alt="Luminor Collection"
                        />
                      </td>
                      <td>{collection.slug}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="25px"
                          className="pointer-icon"
                          onClick={() =>
                            navigate(`/collection/edit/${collection.slug}`)
                          }
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width="25px"
                          className="trash-icon"
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
                              const adminDeleted = await axios({
                                method: "delete",
                                url:
                                  process.env.REACT_APP_API_URL +
                                  `/collections/${collection.id}`,
                                headers: { Authorization: "Bearer " + token },
                              });
                              console.log(adminDeleted.data);
                              const collectionUpdated = await axios({
                                method: "get",
                                url:
                                  process.env.REACT_APP_API_URL +
                                  "/collections",
                                headers: { Authorization: "Bearer " + token },
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
                          <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
                        </svg>
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
