import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
import ListStudents from "./components/ListStudents";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<ListStudents />} />
        <Route path="addstudent" element={<AddStudent />} />
        <Route path="editstudent/:id" element={<EditStudent />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
