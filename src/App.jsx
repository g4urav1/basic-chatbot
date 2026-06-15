import Home from "./Pages/home";
import Parent from "./Pages/parent";
import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Parent/>,
    children: [
      {path:"", element: <Home/>}
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}