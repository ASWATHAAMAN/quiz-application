import { Navbar } from "./Components/Navbar.components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <Navbar />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
