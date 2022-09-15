import Navigation from "./Navigation";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">ADMIN LIST</h1>
            <hr />
            <Button variant="success" onClick={() => navigate("/admin/create")}>
              New Admin
            </Button>
            <table class="table table-striped table-bordered align-middle mt-4">
              <thead class="table-dark">
                <tr>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nicolas</td>
                  <td>Perdigon</td>
                  <td>nicoperdigon@gmail.com</td>
                  <td>123</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => navigate("/admin/edit")}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
