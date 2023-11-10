import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import People from "./pages/People";
import Person from "./pages/Person";
import Favorites from "./pages/Favorites";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

root.render(<RouterProvider router={routers} />);
