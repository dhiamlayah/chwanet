const AdminSpace = () => {
  return (
    <div className=" pt-5 bg-secondary " style={{minHeight:"100vh"}}>
      <table className="table  mt-5">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col ">accept</th>
            <th scope="col">delete</th>

          </tr>
        </thead>
        <tbody className="table-dark">
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>

          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>

          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminSpace;
