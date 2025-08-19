import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
