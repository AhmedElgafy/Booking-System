import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import AuthLayout from "./pages/auth/authLayout";
import MainLayout from "./components/mainLayout";
import ServicesPage from "./pages/services/services";
import AddService from "./pages/addService";
import CreateSlots from "./pages/services/createSlots";
import Booking from "./pages/booking";
import NotFound from "./pages/notFound";
import PrivatePages from "./pages/privatePages";
import Categories from "./pages/categories";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      { path: "/booking", element: <Booking /> },
      { path: "/services", element: <ServicesPage /> },
      {element:<PrivatePages/>,children:[
        { path: "/services/:id", element: <AddService /> },
      ]},
      { path: "/services/slots/:id", element: <CreateSlots /> },
      { path: "/categories", element: <Categories /> },
      {
        path: "*",
        element: <NotFound />,
      },
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
