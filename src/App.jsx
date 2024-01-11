import { Navbar } from "./Components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/signIn",
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
