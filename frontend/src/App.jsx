import "./App.css";
import { getPosts } from "./api/api";
import { useEffect, useState } from "react";

import AddWorker from "./Pages/AddWorkerp";
import Home from "./Pages/Homep";
import Attendance from "./Pages/Attendancep";
import UpdateUserProfile from "./Pages/UpdateUserProfilep";
import UpdateWorker from "./Pages/UpdateWorkerp";
import UserProfile from "./Pages/UserProfilep";
import WorkerDetails from "./Pages/WorkerDetailsp";
import WorkerList from "./Pages/WorkersListp";



import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    // errorElement: <ErrorPage />,
  },
  // {
  //   path: "/loginsignup",
  //   element: <LoginSignup />,
  // },
  {
    path: "/workers",
    element: <WorkerList />,
  },
  {
    path: "/addworker",
    element: <AddWorker />,
  },
  // {
  //   path: "/tasks",
  //   element: <Task />,
  // },
  {
    path: "/workerdetails",
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
    path: "/updateworker",
    element: <UpdateWorker />,
  },
]);

function App() {
  // const [data, setData] = useState(null);

  // useEffect(()=>{
  //   getPosts().then((posts)=>setData(posts));
  // },[]);
  // {/* {data ? data.map((e) => <li>{e.name}</li>) : <p>data not found</p>} */}
  const params = useParams();
  console.log(params);
  return (
    <>
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
