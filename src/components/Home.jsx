import Navigation from "./Navigation";

function Home() {
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="mt-5 fw-bold">ORDERS LIST</h1>
            <hr />
            <table class="table table-striped table-bordered align-middle mt-4">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Date</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Product List</th>
                  <th scope="col">Price</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>15/9/22</td>
                  <td>nicoperdigon@gmail.com</td>
                  <td>Jose H. Figueiras</td>
                  <td>
                    <ul className="text-start">
                      <li>Luminor Regatta Blu Mare - quantity 1</li>
                      <li>Luminor Chrono Goldtech™ Blu - quantity 1</li>
                    </ul>
                  </td>
                  <td>$USD 24000</td>
                  <td>Delivered</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>15/9/22</td>
                  <td>nicoperdigon@gmail.com</td>
                  <td>Jose H. Figueiras</td>
                  <td>
                    <ul className="text-start">
                      <li>Luminor Regatta Blu Mare - quantity 1</li>
                      <li>Luminor Chrono Goldtech™ Blu - quantity 1</li>
                    </ul>
                  </td>
                  <td>$USD 24000</td>
                  <td>Delivered</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>15/9/22</td>
                  <td>nicoperdigon@gmail.com</td>
                  <td>Jose H. Figueiras</td>
                  <td>
                    <ul className="text-start">
                      <li>Luminor Regatta Blu Mare - quantity 1</li>
                      <li>Luminor Chrono Goldtech™ Blu - quantity 1</li>
                    </ul>
                  </td>
                  <td>$USD 24000</td>
                  <td>Delivered</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
