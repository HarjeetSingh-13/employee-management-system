import "./App.css";
import AddWorker from "./Pages/AddWorkerp";
import Loan from "./Pages/Loanp";
import Home from "./Pages/Homep";
import Attendance from "./Pages/Attendancep";
import UpdateUserProfile from "./Pages/UpdateUserProfilep";
import UpdateWorker from "./Pages/UpdateWorkerp";
import UserProfile from "./Pages/UserProfilep";
import WorkerDetails from "./Pages/WorkerDetailsp";
import WorkerList from "./Pages/WorkersListp";
import Loginp from "./Pages/Loginp";
import Signupp from "./Pages/Signupp";
import FinancialDetails from "./Pages/FinancialDetailsp";
import PaySalary from "./Pages/PaySalaryp";

import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Loginp />,
  },
  {
    path: "/signup",
    element: <Signupp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/workers",
    element: <WorkerList />,
  },
  {
    path: "/addworker",
    element: <AddWorker />,
  },
  {
    path: "/workerdetails/:id",
    element: <WorkerDetails />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
  },
  {
    path: "/userprofile",
    element: <UserProfile />,
  },
  {
    path: "/updateuser",
    element: <UpdateUserProfile />,
  },
  {
    path: "/updateworker/:id",
    element: <UpdateWorker />,
  },
  {
    path: "/financialdetails/:id",
    element: <FinancialDetails />,
  },
  {
    path: "/addloan/:id",
    element: <Loan />,
  },
  {
    path: "/paysalary/:id",
    element: <PaySalary />,
  },
]);

function App() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div className="container">
        Testing
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
