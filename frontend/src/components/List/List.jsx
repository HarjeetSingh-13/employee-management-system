import { Link } from 'react-router-dom';

function List() {
  return (
    <>
          <tbody>
            <tr>
              <td>111234</td>
              <td>abcdaed</td>
              <td>123564</td>
              <td className="warning">Active</td>            
              <td className="primary"><Link to={"/workerdetails"}>Details</Link></td>
            </tr>
          </tbody>
    </>
  );
}

export default List;
