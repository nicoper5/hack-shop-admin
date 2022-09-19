import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/admin.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function Admin() {
  const [admins, setAdmins] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getAdmins = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_URL + "/admin",
        headers: { Authorization: "Bearer " + token },
      });
      setAdmins(response.data);
    };
    getAdmins();
  }, [admins, token]);

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">ADMIN LIST</h1>
            <hr />
            <Link to="/admin/create" className="btn btn-success">
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
                        <Link
                          to={`/admin/edit/${admin.id}`}
                          className="btn-blue"
                        >
                          Edit
                        </Link>
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
                              console.log(adminDeleted.data);
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
