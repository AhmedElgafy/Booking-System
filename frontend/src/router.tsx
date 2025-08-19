import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import AuthLayout from "./pages/auth/authLayout";
import MainLayout from "./components/mainLayout";
import ServicesPage from "./pages/services/services";
import AddService from "./pages/addService";
import CreateSlots from "./pages/services/createSlots";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      { path: "/providers", element: <>Provider</> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/services/:id", element: <AddService /> },
      { path: "/services/slots/:id", element: <CreateSlots/> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
