import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
