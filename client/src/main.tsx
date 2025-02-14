// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";

/* ************************************************************************* */

import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TablePage from "./pages/TablePage";
import UserTablePage from "./pages/UserTable";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <TablePage />,
      },
      {
        path: "/:id",
        element: <UserTablePage />,
        loader: async ({ params }) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/table/${params.id}`,
          );
          const data = await response.json();
          return data;
        },
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

/* ************************************************************************* */

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
);
