import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import People from "./pages/People";
import Person from "./pages/Person";
import Favorites from "./pages/Favorites";
import ErrorPage from "./pages/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const basePath = process.env.REACT_APP_BASE_PATH || "/";

const routers = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/peoples",
      element: <People />,
    },
    {
      path: "/peoples/:id",
      element: <Person />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ],
  { basename: basePath }
);

root.render(<RouterProvider router={routers} />);
