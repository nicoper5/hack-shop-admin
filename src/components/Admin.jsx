import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/admin.css";
import Swal from "sweetalert2";

function Admin() {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/admin",
      });
      setAdmins(response.data);
    };
    getAdmins();
  }, [admins]);

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">ADMIN LIST</h1>
            <hr />
            <Link to="/admin/create" className="btn-green">
              New Admin
            </Link>
            <table className="table table-striped table-bordered align-middle mt-4">
              <thead className="table-dark">
                <tr>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins &&
                  admins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.firstname}</td>
                      <td>{admin.lastname}</td>
                      <td>{admin.email}</td>
                      <td>
                        <Button
                          variant="primary"
                          className="mx-2"
                          onClick={() => navigate(`/admin/edit/${admin.id}`)}
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
                              const adminDeleted = await axios({
                                method: "delete",
                                url:
                                  process.env.REACT_APP_API_URL +
                                  `/admin/${admin.id}`,
                              });
                              const adminsUpdated = await axios({
                                method: "get",
                                url: process.env.REACT_APP_API_URL + "/admin",
                              });
                              setAdmins(adminsUpdated.data);
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

export default Admin;
